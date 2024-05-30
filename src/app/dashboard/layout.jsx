import { Layout, Menu } from "antd";
import Link from "next/link";

const { Header, Content, Footer } = Layout;

const MyLayout = ({ children }) => {
	return (
		<Layout>
			<Header>
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
					<Menu.Item key="1">
						<Link href="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link href="/accounts">Accounts</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link href="/transactions">Transactions</Link>
					</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: "0 50px" }}>
				<div className="site-layout-content">{children}</div>
			</Content>
			<Footer style={{ textAlign: "center" }}>Banking App ©2024 Created by Your Name</Footer>
		</Layout>
	);
};

export default MyLayout;
