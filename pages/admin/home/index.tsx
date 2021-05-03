import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import netlifyAuth from "../../../netlifyAuth";
import { getData, saveData } from "../../../libs/github";

export default function AdminHome() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
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

  const handleTestSaveData = () => {
    saveData("/public/newfile.txt", "Some data").then(function (result) {
      console.log(result);
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Members Only</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loggedIn ? (
        <main>
          <p className="description">
            Wow, secrets are super cool. Welcome {user?.user_metadata.full_name}
            !
          </p>
          <button
            onClick={() => {
              handleTestSaveData();
            }}
          >
            Test
          </button>
          <button
            onClick={() => {
              netlifyAuth.signout(() => {
                setLoggedIn(false);
                setUser(null);
              });
            }}
          >
            Log out.
          </button>
        </main>
      ) : (
        <main>
          <p>YOU ARE NOT ALLOWED HERE.</p>
          <Link href="/admin">
            <a>Go back to login.</a>
          </Link>
        </main>
      )}

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
