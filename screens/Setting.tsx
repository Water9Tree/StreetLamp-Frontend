import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, IconButton } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";
import { lampInfos } from "../apis/mock";
import LampAddModal from "../components/LampAddModal";

const Setting = ({ navigation }: any) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [visible, setVisible] = useState(false);

  const [items] = useState(lampInfos);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <HeaderBar
        navigation={navigation}
        backScreen={"Main"}
        title={"가로등 관리"}
      />
      <Button
        mode="contained-tonal"
        onPress={() => {
          setVisible(true);
        }}
      >
        추가
      </Button>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>No.</DataTable.Title>
          <DataTable.Title>가로등명</DataTable.Title>
          <DataTable.Title numeric>관리</DataTable.Title>
        </DataTable.Header>
        {items.slice(from, to).map((item, index) => (
          <DataTable.Row key={item.lampId}>
            <DataTable.Cell>{index + 1}</DataTable.Cell>
            <DataTable.Cell>{item.lampName}</DataTable.Cell>
            <DataTable.Cell numeric>
              <IconButton
                icon="trash-can-outline"
                iconColor="red"
                size={30}
                onPress={() => console.log("Pressed")}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      <LampAddModal visible={visible} setVisible={setVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Setting;
