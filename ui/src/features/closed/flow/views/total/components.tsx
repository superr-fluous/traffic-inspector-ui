import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";

const Animated = ({ digit, keyId, style }: { digit: number | string; keyId: string; style?: CSSProperties }) => (
	<Box
		style={style}
		key={keyId}
		sx={{
			display: "inline-block",
			overflow: "hidden",
			textAlign: "center",
		}}
	>
		<Slide direction='up' in timeout={300}>
			<Typography variant='blockHeader' style={{ fontSize: "2rem", color: "var(--accent)", lineHeight: 1 }}>
				{digit}
			</Typography>
		</Slide>
	</Box>
);

const AnimatedNumber = ({ number }: { number: number }) => {
	const [digits, setDigits] = useState<number[]>([]);

	useEffect(() => {
		const numStr = number.toString();
		setDigits(numStr.split("").map(Number));
	}, [number]);

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			{digits.map((digit, index) => (
				<>
					<Animated digit={digit} key={index} keyId={`${digit}-${index}`} />
					{digits.length > 3 && index !== digits.length - 1 && (digits.length - 1 - index) % 3 === 0 && (
						<Animated digit=',' key={`,${index}`} keyId={`,${index}`} style={{ marginRight: "0.5rem" }} />
					)}
				</>
			))}
		</Box>
	);
};

export default AnimatedNumber;
