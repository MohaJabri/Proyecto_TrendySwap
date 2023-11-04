import { useEffect } from "react";
import Layout from "../hocs/Layout";
import { get_services_by_arrival } from "../redux/actions/services";
import { connect } from "react-redux";
import NewServices from "../components/home/NewServices";

const Home = ({ get_services_by_arrival, services_arrival }) => {
  useEffect(() => {
    get_services_by_arrival();
  }, []);
  return (
    <Layout>
      <div className="text-green-700">
        <NewServices data={services_arrival} />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  services_arrival: state.Services.services_arrival,
});
export default connect(mapStateToProps, { get_services_by_arrival })(Home);
