import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function ReviewCard() {
    const [value, setValue] = React.useState(2);

    return (
        <>
            <div className="flex justify-center">
                <form style={{ width: "590px" }} className='bg-gray-7800	 p-3'>
                    <div className="">
                        <h1 className="text-center text-xl">Rating</h1>

                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            className='flex justify-center mb-3'
                        >
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>


                    </div>
                    <h1 className="text-center text-xl mb-1">Comment</h1>
                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label for="comment" class="sr-only">Your comment</label>
                            <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                        </div>
                        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send the review</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}