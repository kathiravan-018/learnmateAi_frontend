import { useNavigate } from "react-router-dom";

export default function FeatureCard({
    icon,
    title,
    description,
    path,
    number
}) {

    const navigate = useNavigate();

    return (

        <div
            onClick={() => navigate(path)}
            className="
                group
                relative
                bg-white
                rounded-3xl
                p-7
                border
                border-gray-200
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                hover:border-sky-200
                transition-all
                duration-300
                cursor-pointer
                overflow-hidden
            "
        >

            {/* Decorative Background */}

            <div className="
                absolute
                -right-10
                -top-10
                w-28
                h-28
                rounded-full
                bg-sky-50
                group-hover:bg-sky-100
                transition-colors
                duration-300
            " />


            {/* Feature Number */}

            <div className="
                absolute
                top-6
                right-6
                text-xs
                font-bold
                text-gray-300
                group-hover:text-sky-300
                transition-colors
            ">

                {number}

            </div>


            {/* Icon */}

            <div className="
                relative
                w-14
                h-14
                rounded-2xl
                bg-sky-50
                text-2xl
                flex
                items-center
                justify-center
                group-hover:bg-sky-600
                group-hover:scale-110
                transition-all
                duration-300
            ">

                <span className="
                    group-hover:scale-110
                    transition-transform
                    duration-300
                ">

                    {icon}

                </span>

            </div>


            {/* Title */}

            <h3 className="
                mt-7
                text-xl
                font-bold
                text-gray-900
                group-hover:text-sky-700
                transition-colors
                duration-300
            ">

                {title}

            </h3>


            {/* Description */}

            <p className="
                mt-3
                text-gray-500
                text-[15px]
                leading-7
            ">

                {description}

            </p>


            {/* Try Feature */}

            <div className="
                mt-7
                inline-flex
                items-center
                gap-2
                text-sm
                font-bold
                text-gray-700
                group-hover:text-sky-600
                group-hover:gap-3
                transition-all
                duration-300
            ">

                Try {title}

                <span className="
                    text-lg
                ">
                    →
                </span>

            </div>

        </div>

    );

}