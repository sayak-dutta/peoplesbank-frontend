import Sidebar from "@/component/layout/sidebar";
import { Layout, Menu, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import MenuItem from "antd/es/menu/MenuItem";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";


const MyLayout = async ({ children }) => {
	const session = await getServerSession()
	if(!session){
		redirect('/auth')
	}
	return (
		<Layout>
			<Header>
				<div className="logo" />
				<Menu theme="dark" mode="horizontal">
					<MenuItem key="1" className="fs-2">
						<Image width={600} height={40} style={{width:"100%"}} src={"/logo.png"} alt='people bank' />
					</MenuItem>
				</Menu>
			</Header>
			<Layout style={{minHeight:'90vh'}}>
				<Sidebar/>
				<Content style={{ padding: "15px 15px" }}>
					<div className="site-layout-content">{children}</div>
				</Content>
			</Layout>
			<Footer style={{ textAlign: "center" , padding:"0 0" }}> <p className="py-1"> Peoples Bank ©2024 Created by Sayak Dutta </p></Footer>
		</Layout>
	);
};

export default MyLayout;

