import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, DataTable, IconButton } from "react-native-paper";
import HeaderBar from "../components/HeaderBar";
import { lampInfos } from "../apis/mock";
import LampAddModal from "../components/LampAddModal";
import axios from "axios";
import LampEditModal from "../components/LampEditModal";
import { useGetLampsQuery } from "../apis/apis";

const Setting = ({ navigation }: any) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [items, setItems] = useState(lampInfos);
  const [selectedItem, setSelectedItem] = useState<any>();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  const { data: lamps } = useGetLampsQuery();

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    if (!selectedItem) return;
    console.log(selectedItem);
    setEditVisible(true);
  }, [selectedItem]);

  useEffect(() => {
    if (!lamps) return;
    setItems(lamps);
  }, [lamps]);

  return (
    <View style={styles.container}>
      <HeaderBar
        navigation={navigation}
        backScreen={"Main"}
        title={"가로등 관리"}
      />
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginHorizontal: 15,
        }}
      >
        <Button
          style={{ width: 80 }}
          buttonColor="rgb(120, 69, 172)"
          textColor="white"
          mode="contained-tonal"
          onPress={() => {
            setVisible(true);
          }}
        >
          추가
        </Button>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>No.</DataTable.Title>
          <DataTable.Title>가로등명</DataTable.Title>
          <DataTable.Title numeric>관리</DataTable.Title>
        </DataTable.Header>
        {items.slice(from, to).map((item, index) => {
          return (
            <DataTable.Row
              key={item.lampName}
              onPress={() => {
                setSelectedItem(item);
              }}
            >
              <DataTable.Cell>{index + 1}</DataTable.Cell>
              <DataTable.Cell>{item.lampName}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Button
                  mode="contained-tonal"
                  buttonColor="lightpink"
                  onPress={() => {
                    //axios.delete(`/lamps/${item._id}`);
                  }}
                >
                  삭제
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
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
      <LampEditModal
        visible={editVisible}
        setVisible={setEditVisible}
        lampData={selectedItem}
      />
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
