import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { LampInfo, LampStatus, SignInInfo, User } from "./dto";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "../store";
import { QueryClient } from "@tanstack/react-query";

const useSignUpMutation = () => {
  const fetcher = (props: User) => {
    return axios.post("/users", props);
  };

  return useMutation(fetcher);
};

const useSignInMutation = () => {
  const setTokenState = useSetRecoilState(tokenState);
  const fetcher = (props: SignInInfo) => {
    return axios.post("/auth/signIn", props).then(({ data }) => data);
  };

  return useMutation(fetcher, {
    onSuccess: ({ access_token }) => {
      setTokenState(access_token);
    },
  });
};

const useCreateLampMutation = () => {
  const getTokenState = useRecoilValue(tokenState);
  const queryClient = useQueryClient();

  const fetcher = (props: LampInfo) => {
    return axios.post("/lamps", props, {
      headers: {
        Authorization: `Bearer ${getTokenState}`,
      },
    });
  };

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lamps"]);
    },
  });
};

const useUpdateLampMutation = () => {
  const getTokenState = useRecoilValue(tokenState);
  const queryClient = useQueryClient();

  const fetcher = ({
    lampId,
    lampInfo,
  }: {
    lampId: string;
    lampInfo: Partial<LampInfo>;
  }) => {
    return axios.patch(`/lamps/${lampId}`, lampInfo, {
      headers: {
        Authorization: `Bearer ${getTokenState}`,
      },
    });
  };

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lamps"]);
    },
  });
};

const useDeleteLampMutation = () => {
  const getTokenState = useRecoilValue(tokenState);
  const queryClient = useQueryClient();

  const fetcher = (lampId: string) => {
    return axios.delete(`/lamps/${lampId}`, {
      headers: {
        Authorization: `Bearer ${getTokenState}`,
      },
    });
  };

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["lamps"]);
    },
  });
};

const useGetLampsQuery = ({ status }: { status?: LampStatus | null }) => {
  const fetcher = () => {
    return axios.get(`/lamps`, { params: { status } }).then(({ data }) => data);
  };

  return useQuery(["lamps"], fetcher);
};

export {
  useSignUpMutation,
  useSignInMutation,
  useCreateLampMutation,
  useUpdateLampMutation,
  useDeleteLampMutation,
  useGetLampsQuery,
};
