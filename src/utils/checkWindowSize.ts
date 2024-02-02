export function isMobile(windowWidth: number): boolean {
	if (windowWidth <= 898) {
		return true;
	} else {
		return false;
	}
}

export function heightIsSmall(windowHeight: number, windowHeightBreakpoint: number): boolean {
	if (windowHeight <= windowHeightBreakpoint) {
		return true;
	} else {
		return false;
	}
}
