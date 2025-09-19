import React from "react";
import {Table, Pagination} from "antd";
import {useChangePage} from "@/service/pageService";

const TableWithPagination = ({state, columns, setState, showScrollX = false, paginationUrl}) => {
    const scroll = showScrollX ? {x: 'max-content', y: 55 * 12} : {};
    const pagination = {
        position: ['bottomCenter'],
        current: state.currentPage,
        pageSize: state.pageSize,
        total: state.totalPage,
    };
    const changePage = useChangePage();

    return (
        <>
            <Table
                dataSource={state.data}
                columns={columns}
                rowKey={
                    (record) => record.id || Math.random().toString(36).substring(2, 15)
                }
                pagination={false}
                bordered
                loading={state.loadingTable}
                scroll={scroll}
            />

            <Pagination
                {...pagination}
                showSizeChanger
                onChange={(page, pageSize) => {
                    setState(prev => ({
                        ...prev,
                        loadingTable: true,
                    }));

                    setState((prev) => ({
                        ...prev,
                        currentPage: page,
                        pageSize: pageSize,
                        searchValue: '',
                    }));
                    changePage({currentPage: page, state, setState, limit: pageSize, paginationUrl}).then(
                        () => {
                            setState((prev) => ({
                                ...prev,
                                loadingTable: false,
                            }));
                        }
                    );
                }}
                onShowSizeChange={(current, size) => {
                    setState((prev) => ({
                        ...prev,
                        currentPage: current,
                        pageSize: size,
                    }));
                    changePage({currentPage: current, state, setState, limit: size, paginationUrl}).then();
                }}
                showTotal={() => `Total ${state.originalData.length} registros`}
                pageSizeOptions={[10, 20, 50, 100]}
                size="default"
                style={{
                    marginTop: 16,
                    display: 'flex',
                    justifyContent: 'center',
                }}
                disabled={state.loadingTable || state.data.length === 0}
            />
        </>
    )
}

export default TableWithPagination;
