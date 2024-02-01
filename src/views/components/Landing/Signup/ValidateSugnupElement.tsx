type ValidateSignupElementProps = {
    invalid: boolean;
    errorAfterSub: boolean;
    infoIfCorrect: string; 
    infoIfWrong: string;
}

export function ValidateSignupElement({invalid, errorAfterSub, infoIfCorrect, infoIfWrong}: ValidateSignupElementProps){
    return (
        <div className='text-main-txt'>
				<div className='flex flex-row'>
					<span
						className={`material-symbols-outlined font-bold rounded-full text-sm w-5 h-5 flex items-center justify-center mb-4 ${
							!invalid
								? 'bg-primary text-white'
								: 'bg-form text-second-txt'
						} ${errorAfterSub && invalid && 'bg-red text-white'}`}>
						check
					</span>
					<p className={`ml-2 inline text-main-txt`}>
						{!invalid || !errorAfterSub
							? infoIfCorrect
							: infoIfWrong}
					</p>
				</div>
			</div>
    )
}