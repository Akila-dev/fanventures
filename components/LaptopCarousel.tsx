'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAnimate, motion } from 'framer-motion';

interface ICardProps {
	img: string;
	initial: {
		x: number | string;
		y: number | string;
		scale: number;
		z: number;
	};
	positions: {
		x: number | string;
		y: number | string;
		scale: number;
		z: number;
	}[];
	id: number;
	incrementFactor: number;
	onClick: any;
}

const CarouselCard = ({
	positions,
	initial,
	img,
	id,
	incrementFactor,
	onClick,
}: ICardProps) => {
	const carouselId: string = 'carousel-card-' + id;
	const [pos, setPos] = useState(id);
	const [nextPos, setNextPos] = useState(id);
	const [scope, animate] = useAnimate();

	useEffect(() => {
		setNextPos(
			id + incrementFactor < positions.length
				? id + incrementFactor
				: id + incrementFactor - positions.length
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [incrementFactor]);

	return (
		<motion.div
			ref={scope}
			initial={{
				x: initial.x,
				y: initial.y,
				scale: initial.scale,
				z: initial.z,
			}}
			animate={{
				x: positions[nextPos].x,
				y: positions[nextPos].y,
				scale: positions[nextPos].scale,
				z: positions[nextPos].z,
			}}
			transition={{
				type: 'spring',
				duration: 0.75,
				bounce: 0.25,
			}}
			onClick={onClick}
			// onClick={(e) => onClick(id, e)}
			// onClick={(e) => onClick(nextPos, e)}
			// transition={{
			// 	duration: 0.75,
			// 	ease: 'circOut',
			// }}
			id={carouselId}
			className={`h-[80%] w-auto  md:w-auto absolute top-[7%] overflow-hidden cursor-pointer ${
				nextPos !== 0 &&
				'shadow-xl shadow-black/20 rounded-[1rem] lg:rounded-[1.5rem]'
			}`}
		>
			<Image
				src={img}
				alt="laptop"
				width={750}
				height={450}
				className="w-auto h-full object-contain"
			/>
		</motion.div>
	);
};

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
		{ x: '73%', y: 0, scale: 0.35, z: 1 },
		{ x: '90%', y: '-40%', scale: 0.285, z: -10 },
		{ x: '-91.5%', y: '-40%', scale: 0.285, z: -10 },
		{ x: '-74.5%', y: 0, scale: 0.375, z: 1 },
	];
	// ! LIST OF POSITIONS FOR MOBILLE
	const mobilePositions: Array<IPosition> = [
		{ x: 0, y: 4, scale: 0.6, z: 1 },
		{ x: '58%', y: 0, scale: 0.35, z: 1 },
		{ x: '30%', y: '-40%', scale: 0.285, z: -10 },
		{ x: '-31.5%', y: '-40%', scale: 0.285, z: -10 },
		{ x: '-60.5%', y: 0, scale: 0.375, z: 1 },
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
		// let diff: number = Math.abs(incrementFactor - x);

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
			// if (incrementFactor - 1 >= 0) {

			// 	setIncrementFactor(incrementFactor - 1);
			// } else {
			// 	setIncrementFactor(positions.length);
			// }
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

			// for (let i = 0; i < x - incrementFactor; i++) {
			// 	if (incrementFactor + 1 < positions.length) {
			// 		setIncrementFactor(incrementFactor + 1);
			// 	} else {
			// 		setIncrementFactor(0);
			// 	}
			// }
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
							<CarouselCard
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
							className="w-[80%] h-full object-contain "
						/>
						{/* SLIDER IMAGES */}
						{carouselImages.map((img: string, i: number) => (
							<CarouselCard
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
		</div>
	);
};

export default LaptopCarousel;
