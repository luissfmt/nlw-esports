import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {};

export const Input: React.FC<Props> = (props) => {
    return (
        <input
         {...props}
         className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
        />
    );
};