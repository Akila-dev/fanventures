'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

const LaptopCarouselCard = ({
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

export default LaptopCarouselCard;
