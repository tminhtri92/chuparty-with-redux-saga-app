import React, { useState, useEffect, useRef } from "react"
import Head from "next/head"
import Link from "next/link"
import FileBase64 from "react-file-base64"
import styled from "styled-components"
import { END } from "redux-saga"
import { wrapper } from "../../../redux/store"
import { settingMenuActions } from "../../../redux/actions"
import { useSelector } from "react-redux"
// import netlifyAuth from "../../../netlifyAuth";
import {
  getData,
  saveData,
  saveDataImage,
  saveDataJSON,
} from "../../../libs/github"
import AdminLayout from "../../../components/Admin/Layout"
import Tree from "@atlaskit/tree"
import DragDropWithNestingTree from "../../../components/Admin/DragDropWithNestingTree"
import AddMenuModal from "../../../components/Admin/Menu/AddMenuModal"

export default function AdminHome() {
  const settingMenu = useSelector((state) => state.settingMenu)
  const [settingMenuData, setSettingMenuData] = useState(null)
  const [fileUpload, setFileUpload] = useState(null)
  const menuData = useRef(null)
  useEffect(() => {
    setSettingMenuData(settingMenu)
  }, [])

  useEffect(() => {
    console.log(settingMenuData)
  }, [settingMenuData])

  const handleSaveImageData = () => {
    const base64result = fileUpload.base64.split(",")[1]
    saveDataImage("public/test.png", base64result).then(function (result) {
      console.log(result)
    })
  }

  const handleSaveData = (fileName) => {
    console.log("menuData.current.state.tree", menuData.current.state.tree)
    saveDataJSON(`public/${fileName}`, menuData.current.state.tree).then(
      function (result) {
        console.log(result)
      }
    )
  }

  const getFiles = (files) => {
    setFileUpload(files)
    console.log(files)
    const base64result = files.base64.split(",")[1]
    console.log("ádasd", base64result)
  }

  // <FileBase64 multiple={false} onDone={(files) => getFiles(files)} />
  return (
    <div className="container">
      <Head>
        <title>Members Only</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminLayout>
        <button
          onClick={() => {
            handleSaveData("settings/menu.json")
          }}
        >
          Save
        </button>

        {settingMenuData && (
          <DragDropWithNestingTree
            data={settingMenuData.data}
            ref={menuData}
            callback={(item) => {
              console.log(item)
            }}
          />
        )}
      </AdminLayout>
    </div>
  )
}

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   if (!store.getState().settingMenu) {
//     store.dispatch(settingMenuActions.settingMenuLoadData());
//     store.dispatch(END);
//   }

//   await store.sagaTask.toPromise();
// });

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    if (!store.getState().settingMenu) {
      store.dispatch(settingMenuActions.settingMenuLoadData())
      store.dispatch(END)
    }

    await store.sagaTask.toPromise()
  }
)
