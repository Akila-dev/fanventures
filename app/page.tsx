import { LaptopCarousel, Navbar } from '@/components';

export default function Home() {
	return (
		<main className="">
			<Navbar />
			<LaptopCarousel />
			<div className="px-4 md:px-[3rem] xl:px-[4rem] max-w-[1240px] mx-auto flex flex-col text-center justify-center gap-5 py-5 pb-[50px]">
				<button className="text-[--fg] font-semibold">Search</button>
				<p className="text-[--fg] text-sm lg:text-base">
					Discover exciting investment opportunities by browsing creator
					fundraising campaigns. Investors can explore various campaigns where
					creators offer a share of their future income, making it easy to find
					the right investment.
				</p>
				<div>
					<button className="bg-[--brand] rounded-lg py-2 px-4 min-w-[125px] text-[--bg] text-sm lg:text-base">
						Join Us
					</button>
				</div>
			</div>
		</main>
	);
}
