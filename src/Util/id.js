
let i = new Date().getTime();
export default function id():string{
	i++;
	return i.toString();
}