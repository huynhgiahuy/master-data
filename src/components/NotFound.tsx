import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return <div>
    <Result
      status="404"
      title="Page not found"
      subTitle="Sorry, page not found!"
      extra={ <Link to="/user">  <Button type="primary">  Back to User list </Button> </Link> }
  />
  </div>;
};

export default NotFound;
