import loading from "../../public/imgs/loading.png"
import Image from "next/image"
export default function Loading() {
    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="w-10">
                <Image src={loading} alt="Loader" className="animate-spin" />
            </div>
        </div>
    )
}