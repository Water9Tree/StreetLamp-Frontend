import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { LampInfo, LampStatus, SignInInfo, User } from "./dto";

const useSignUpMutation = () => {
  const fetcher = (props: User) => {
    return axios.post("/users", props);
  };

  return useMutation(fetcher);
};

const useSignInMutation = () => {
  const fetcher = (props: SignInInfo) => {
    return axios.post("/auth/signIn", props);
  };

  return useMutation(fetcher);
};

const useCreateLampMutation = () => {
  const fetcher = (props: LampInfo) => {
    return axios.post("/lamps", props);
  };

  return useMutation(fetcher);
};

const useUpdateLampMutation = () => {
  const fetcher = ({
    lampId,
    lampInfo,
  }: {
    lampId: number;
    lampInfo: Partial<LampInfo>;
  }) => {
    return axios.patch(`/lamps/${lampId}`, lampInfo);
  };

  return useMutation(fetcher);
};

const useDeleteLampMutation = () => {
  const fetcher = (lampId: number) => {
    return axios.delete(`/lamps/${lampId}`);
  };

  return useMutation(fetcher);
};

const useGetLampsQuery = (status?: LampStatus) => {
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
