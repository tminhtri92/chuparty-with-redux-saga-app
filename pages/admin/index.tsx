import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import netlifyAuth from "../../netlifyAuth";

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
        <p className="description">
          We are in a public space, for the people who aren't able to access the
          super fancy members-only area. You hear snobbish laughter in the
          distance.
        </p>
        {loggedIn ? (
          <div>
            You're logged in! Please do visit{" "}
            <Link href="/admin/home">
              <a>the special, members-only space.</a>
            </Link>
          </div>
        ) : (
          <button onClick={login}>
            Log in here to access the members-only area.
          </button>
        )}
      </main>

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
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-family: Menlo, Monaco, Lucida Console, Courier New, monospace;
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
