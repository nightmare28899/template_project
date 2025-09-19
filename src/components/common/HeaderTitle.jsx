import React from "react";
import {Input} from "antd";
import Button from "@/components/common/Button";
import {makePetitions} from "@/service/core/makePetitions";

const { Search } = Input;

const HeaderTitle = ({headerTitle, showModal, textButton, hideButton = false, hideSearch = false, placeholderSearch = "", urlSearch = "",
                         state, setState}) => {
    const {get} = makePetitions;
    async function onSearch (value) {
        setState(prevState => ({...prevState, loadingTable: true}));
        const finalUrl = `${urlSearch}${value}&page=${1}&per_page=${10}`;

        const response = await get(finalUrl);

        const secretaryData = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response)
                ? response
                : [];

        setState({
            ...state,
            data: secretaryData,
            originalData: secretaryData,
            totalPage: response.total || 0,
            loadingTable: false,
        });
    }

    return (
        <>
            <div style={styles.header}>
                <h2 style={styles.title}>{headerTitle}</h2>
            </div>

            {
                !hideButton && (
                    <div style={styles.buttonContainer}>
                        <Button
                            action={showModal}
                            textButton={textButton}
                        />
                    </div>
                )
            }
            
            { 
                !hideSearch && (
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 20
                    }}>
                        <Search placeholder={placeholderSearch} allowClear onSearch={onSearch} style={{ width: 250 }} />
                    </div>
                )
            }

        </>
    );
};

const styles = {
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 12,
        borderBottom: "2px solid #4A001F",
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        margin: 0,
        color: "#4A001F",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 20,
    },
};

export default HeaderTitle;
