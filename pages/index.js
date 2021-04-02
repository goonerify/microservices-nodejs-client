import axios from "axios";

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser');
  console.log("printing currentUser");
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server!
    // requests should be made to DOMAIN/ROUTE i.e http://SERVICENAME.NAMESPACE.svc.cluster.local/ROUTE
    const { data } = await axios.get(
      "http://istio-ingressgateway.istio-system.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );

    return data;
  } else {
    // we are on the browser!
    // requests can be made with a base url of ''
    const { data } = await axios.get("/api/users/currentuser");

    return data;
  }
  return {};
};

export default LandingPage;
