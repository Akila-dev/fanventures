'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAnimate, motion, AnimatePresence } from 'framer-motion';
import LaptopCarouselCard from '@/components/LaptopCarouselCard';

interface ITextData {
	heading: string;
	text: string;
}

const textData: Array<ITextData> = [
	{
		heading: 'search',
		text: 'Discover exciting investment opportunities by browsing creator fundraising campaigns. Investors can explore various campaigns where creators offer a share of their future income, making it easy to find the right investment.',
	},
	{
		heading: 'Dashboard',
		text: 'A personalized dashboard to oversee all activities. Creators can manage their finances and launch campaigns, while investors monitor their portfolios, manage investments and keep a watchlist of promising opportunities.',
	},
	{
		heading: 'Analytics',
		text: 'Access detailed data about creators and their performance over time. View key metrics such as views, subscribers, video count, watch hours, and income statistics to make informed investment decisions.',
	},
	{
		heading: 'Social Proof Investing',
		text: 'Leverage community insights to guide your investments. Investors can rate investment opportunities, leave comments, and connect with others to share ideas and experiences, fostering informed and collaborative investing.',
	},
	{
		heading: 'Payment Gate',
		text: "Enjoy a seamless payment experience with multiple options, including FanVentures' own account balance, credit card, Google Pay and Apple Pay. Make instant top-ups and withdraw funds with ease at any time.",
	},
];

interface IPosition {
	x: number | string;
	y: number | string;
	scale: number;
	z: number;
}

const LaptopCarousel = () => {
	const carouselImages: string[] = [
		'/carouselImages/1.jpg',
		'/carouselImages/2.jpg',
		'/carouselImages/3.jpg',
		'/carouselImages/4.jpg',
		'/carouselImages/5.jpg',
	];
	const listedPoints = [0, 4, 3, 2, 1];
	// ! LIST OF POSITIONS FOR DESKTOP AND TABLETS
	const positions: Array<IPosition> = [
		{ x: 0, y: 0, scale: 1, z: 1 },
		{ x: '-74.5%', y: 0, scale: 0.375, z: 1 },
		{ x: '-91.5%', y: '-40%', scale: 0.285, z: -10 },
		{ x: '90%', y: '-40%', scale: 0.285, z: -10 },
		{ x: '73%', y: 0, scale: 0.35, z: 1 },
	];
	// ! LIST OF POSITIONS FOR MOBILLE
	const mobilePositions: Array<IPosition> = [
		{ x: 0, y: 4, scale: 0.6, z: 1 },
		{ x: '58%', y: 4, scale: 0.35, z: 1 },
		{ x: '30%', y: '-50%', scale: 0.285, z: -100 },
		{ x: '-31.5%', y: '-50%', scale: 0.285, z: -100 },
		{ x: '-60.5%', y: 4, scale: 0.375, z: 1 },
	];
	const [incrementFactor, setIncrementFactor] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (incrementFactor + 1 < positions.length) {
				setIncrementFactor(incrementFactor + 1);
			} else {
				setIncrementFactor(0);
			}
		}, 5000);
		return () => clearInterval(interval);
	}, [incrementFactor, positions.length]);

	const navigateTo: any = (x: any, e: any) => {
		e.preventDefault();
		let speed: number = 150;

		if (incrementFactor > x) {
			let diff: number = incrementFactor - x;
			const interval = setInterval(() => {
				if (incrementFactor - 1 >= 0) {
					setIncrementFactor((prevState) => prevState - 1);
				} else {
					setIncrementFactor(positions.length);
				}
				diff - 1;
			}, speed);
			setTimeout(() => {
				clearInterval(interval);
			}, speed * diff);
		} else {
			let diff: number = x - incrementFactor;
			const interval = setInterval(() => {
				if (incrementFactor + 1 < positions.length) {
					setIncrementFactor((prevState) => prevState + 1);
				} else {
					setIncrementFactor(0);
				}
				diff - 1;
			}, speed);
			setTimeout(() => {
				clearInterval(interval);
			}, speed * diff);
		}
	};

	return (
		<div className="w-full overflow-hidden">
			<div className="px-5 md:px-[3rem] xl:px-[4rem] max-w-[1240px] mx-auto">
				<div className="h-[80vw] md:h-[50vh] md:max-h-[350px] lg:h-[65vh] lg:max-h-[450px] w-full">
					{/* DESKTOP CAROUSEL */}
					<div
						className="hidden md:flex h-[90%] w-full justify-center relative"
						style={{
							perspective: '500px',
							transformStyle: 'preserve-3d',
							perspectiveOrigin: 'center center',
						}}
					>
						<Image
							src="/imgs/laptop.png"
							alt="laptop"
							width={750}
							height={450}
							className="w-auto h-full object-contain"
						/>
						{/* SLIDER IMAGES */}
						{carouselImages.map((img: string, i: number) => (
							<LaptopCarouselCard
								key={i}
								positions={positions}
								initial={positions[i]}
								incrementFactor={incrementFactor}
								id={i}
								img={img}
								onClick={(e: any) => navigateTo(listedPoints[i], e)}
							/>
						))}
					</div>

					{/* MOBILE CAROUSEL */}
					<div
						className="flex md:hidden h-[90%] w-full justify-center items-center relative px- md:px-0"
						style={{
							perspective: '500px',
							transformStyle: 'preserve-3d',
							perspectiveOrigin: 'center center',
						}}
					>
						<Image
							src="/imgs/laptop.png"
							alt="laptop"
							width={750}
							height={450}
							className="w-[80%] h-auto object-contain "
						/>
						{/* SLIDER IMAGES */}
						{carouselImages.map((img: string, i: number) => (
							<LaptopCarouselCard
								key={i}
								positions={mobilePositions}
								initial={mobilePositions[i]}
								incrementFactor={incrementFactor}
								id={i}
								img={img}
								onClick={(e: any) => navigateTo(listedPoints[i], e)}
							/>
						))}
					</div>

					{/* NAVIGATION DOTS */}
					<div className="h-[10%] flex items-center justify-center gap-[6px]">
						{positions.map((_, i: number) => (
							<div
								key={i}
								onClick={(e: any) => navigateTo(i, e)}
								className={`h-[8px] md:h-[10px] rounded-full transition-all duration-700 cursor-pointer  ${
									i === incrementFactor
										? 'w-[16px] md:w-[20px] bg-[--brand]'
										: 'w-[8px] md:w-[10px]  bg-[--neutral] hover:scale-125 hover:bg-[--brandOpacity]'
								}`}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="px-4 md:px-[3rem] xl:px-[4rem] max-w-[1240px] mx-auto flex flex-col text-center justify-center gap-5 py-2 pb-[50px]">
				<div className="relative">
					{/* OPACITY-0, JUST TO GET THE HEIGHT THE CONTAINER SHOULD BE */}
					<motion.div className="space-y-4 opacity-0 relative pointer-events-none">
						<button className="text-[--fg] font-semibold capitalize">
							{textData[incrementFactor].heading}
						</button>
						<p className="text-[--fg] text-sm lg:text-base">
							{textData[incrementFactor].text}
						</p>
					</motion.div>
					{/* ACTUALLY DISPLAYED CONTENT */}
					{textData.map(
						(item: { heading: string; text: string }, i: number) => (
							<AnimatePresence key={i}>
								{i === incrementFactor && (
									<motion.div
										// initial={{ opacity: 0 }}
										animate={{ opacity: [0, 1], y: [5, 0] }}
										// exit={{ opacity: [1, 0], y: [0, 15] }}
										transition={{
											type: 'tween',
											duration: 1,
											ease: 'easeInOut',
											delay: 0.15,
										}}
										key={i}
										className={`space-y-4 absolute top-0 ${
											i === incrementFactor ? 'opacity-100' : 'opacity-0'
										}`}
									>
										<button className="text-[--fg] font-semibold capitalize">
											{item.heading}
										</button>
										<p className="text-[--fg] text-sm lg:text-base">
											{item.text}
										</p>
									</motion.div>
								)}
							</AnimatePresence>
						)
					)}
				</div>
				<div>
					<button className="bg-[--brand] rounded-lg py-2 px-4 min-w-[125px] text-[--bg] text-sm lg:text-base">
						Join Us
					</button>
				</div>
			</div>
		</div>
	);
};

export default LaptopCarousel;
