import React from 'react'

const Loading = () => {

    return (
        <div class="flex justify-center items-center h-screen">
            <div class="flex flex-row gap-2">
                <div class="w-4 h-4 rounded-full bg-brand-500 animate-bounce"></div>
                <div class="w-4 h-4 rounded-full bg-brand-500 animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-4 h-4 rounded-full bg-brand-500 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    );

}

export default Loading
