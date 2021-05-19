import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import FileBase64 from "react-file-base64";
import styled from "styled-components";

import netlifyAuth from "../../../netlifyAuth";
import { getData, saveData, saveDataImage } from "../../../libs/github";

const AdminLayout = ({ children }) => {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
  let [user, setUser] = useState(null);
  const [fileUpload, setFileUpload] = useState(null);

  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
  useEffect(() => {
    let isCurrent = true;
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user);
        setUser(user);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  let login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user);
    });
  };

  return loggedIn ? (
    <Wrapper>{children}</Wrapper>
  ) : (
    <button onClick={login}>
      Log in here to access the members-only area.
    </button>
  );
};

const Wrapper = styled.div``;

export default AdminLayout;
