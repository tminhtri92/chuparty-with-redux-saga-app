import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { END } from "redux-saga";
import { wrapper } from "../../redux/store";
import { settingMenuActions } from "../../redux/actions";

import netlifyAuth from "../../netlifyAuth";
import AdminLayout from "../../components/Admin/Layout";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
  let [user, setUser] = useState(null);

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

  return (
    <div className="container">
      <Head>
        <title>Members Only</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AdminLayout>Home</AdminLayout>
      </main>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (!store.getState().settingMenu) {
    store.dispatch(settingMenuActions.settingMenuLoadData());
    store.dispatch(END);
  }

  await store.sagaTask.toPromise();
});
