export const truncateText = (text: string, truncateAmount=20)=> text.length > truncateAmount ? `${text.slice(0, truncateAmount)}...` : text