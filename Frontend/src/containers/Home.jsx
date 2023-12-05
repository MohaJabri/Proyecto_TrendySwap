import { useEffect } from "react";
import Layout from "../hocs/Layout";
import { get_publications_by_arrival } from "../redux/actions/publications";
import { connect } from "react-redux";
import NewPublications from "../components/home/NewPublications";

const Home = ({ get_publications_by_arrival, publications_arrival }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    get_publications_by_arrival();
  }, []);
  return (
    <Layout>
      <NewPublications data={publications_arrival} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  publications_arrival: state.Publications.publications_arrival,
});
export default connect(mapStateToProps, { get_publications_by_arrival })(Home);
