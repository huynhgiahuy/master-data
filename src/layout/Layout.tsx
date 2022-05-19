import { useEffect } from "react";
import { Layout, Menu, Select } from "antd";
import { Outlet, Link } from "react-router-dom";
import { menuItems } from "../routes/routes.routes";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'
import { StyledDivLogo, StyledDivHeader } from "./Layout.styles";

const { Header, Content, Footer, Sider } = Layout;

export default function AppLayout() {

  const { Option } = Select;

  const { i18n, t } = useTranslation(["body"]);

  const handleLanguageChange = (e: any) => {
    i18n.changeLanguage(e.target.value);
  }

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length && localStorage.getItem("i18nextLng")!.length > 2) {
      i18next.changeLanguage("en");
    }
  }, [])

  const renderMenuItems = (items: typeof menuItems) =>
    items.map((item) => (
      <Menu.Item key={item.to} icon={item.icon}>
        <Link to={item.to}>{t(`${item.name}`)}</Link>
      </Menu.Item>
    ));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <StyledDivLogo className="logo">
          ANT DESIGN
        </StyledDivLogo>
        <Menu theme="dark" mode="inline">
          {renderMenuItems(menuItems)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/*<Header className="site-layout-background" style={{ padding: 0 }} />*/}
        <Header className="site-layout-background" style={{ padding: 0 }}
        >
          <StyledDivHeader>

            <select
              value={localStorage.getItem("i18nextLng")!}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="vn">Vietnam</option>
            </select>
          </StyledDivHeader>
          {/*<StyledDivHeader>VIETNAM</StyledDivHeader>*/}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design &copy; 2022
        </Footer>
      </Layout>
    </Layout>
  );
}
