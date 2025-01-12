export default function Logo({ theme }) {
	return (
		<svg
			width="40"
			height="22"
			viewBox="0 0 107 87"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M66.3197 54.1967C66.3197 43.1691 75.2593 34.2295 86.2869 34.2295V34.2295C97.3145 34.2295 106.254 43.1691 106.254 54.1967V87H66.3197V54.1967Z"
				fill={theme.palette.primary.main}
			/>
			<path
				d="M30.6639 59.0365C30.6639 49.636 38.2846 42.0153 47.6852 42.0153V42.0153C57.0857 42.0153 64.7064 49.636 64.7064 59.0366V87H30.6639V59.0365Z"
				fill={theme.palette.primary.main}
			/>
			<path
				d="M0 63.2311C0 55.2406 6.47757 48.7631 14.468 48.7631V48.7631C22.4585 48.7631 28.9361 55.2406 28.9361 63.2311V87H0V63.2311Z"
				fill={theme.palette.primary.main}
			/>
			<circle
				cx="85.9304"
				cy="14.6189"
				r="14.6189"
				fill={theme.palette.primary.main}
			/>
			<circle cx="47.3812" cy="25.298" r="12.462" fill={theme.palette.primary.main} />
			<ellipse
				cx="14.2097"
				cy="34.5534"
				rx="10.5927"
				ry="10.5927"
				fill={theme.palette.primary.main}
			/>
		</svg>
	);
}
