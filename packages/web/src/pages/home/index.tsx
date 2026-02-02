import Layout from "../layout";

export default function Home() {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center h-screen p-8">
				<h1 className="text-7xl">Hello World! This is KEX.</h1>
				<p className="text-2xl mt-8 tracking-widest">
					I'm a software engineer and a founder of a startup called Kex.
				</p>
			</div>
		</Layout>
	);
}
