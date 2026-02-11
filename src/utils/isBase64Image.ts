const isBase64Image = (url: string): boolean => {
	if (!url || typeof url !== 'string') return false;

	const prefixMatch = url.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,/);
	if (!prefixMatch) return false;

	const base64Data = url.slice(prefixMatch[0].length);
	if (base64Data.length === 0) return false;

	return /^[A-Za-z0-9+/]+=*$/.test(base64Data);
}

export default isBase64Image;
