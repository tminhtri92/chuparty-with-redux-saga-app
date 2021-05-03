import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "../redux/store";
import { userTestAcions } from "../redux/actions";
import Page from "../components/page";

const Index = () => {
  return <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (!store.getState().userTest) {
    store.dispatch(userTestAcions.loadData());
    store.dispatch(END);
  }

  await store.sagaTask.toPromise();
});

export default Index;
