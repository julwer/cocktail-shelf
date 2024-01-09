type HeaderProps = {
	h1Txt: string;
	h2Txt: string;
	h1ClassName?: string;
	h2ClassName?: string;
	className?: string;
};

export default function MainText({
	h1Txt,
	h2Txt,
	h1ClassName,
	h2ClassName,
	className,
}: HeaderProps) {
	return (
		<div className={className}>
			<h1 className={`text-main-txt font-bold text-3xl mt-3 ${h1ClassName}`}>
				{h1Txt}
			</h1>
			<h2 className={`text-second-txt text-xl ${h2ClassName}`}>{h2Txt}</h2>
		</div>
	);
}
