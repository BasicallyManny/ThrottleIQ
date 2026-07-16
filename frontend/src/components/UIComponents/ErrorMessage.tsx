interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <h3 className="text-base font-medium text-red-500">
                Something went wrong
            </h3>

            <p className="mt-1 text-sm text-gray-500">
                {message}
            </p>
        </div>
    );
};
