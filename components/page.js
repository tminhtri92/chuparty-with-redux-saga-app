import Link from "next/link";
import { useSelector } from "react-redux";

function Page({ linkTo, NavigateTo, title }) {
  const userTest = useSelector((state) => state.userTest);

  return (
    <div>
      <h1>{title}</h1>
      <nav>
        <Link href={linkTo}>
          <a>Navigate: {NavigateTo}</a>
        </Link>
      </nav>
      {userTest && (
        <pre>
          <code>{JSON.stringify(userTest, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}

export default Page;
