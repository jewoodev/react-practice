import Image from "next/image";

export default function AuthLayout(
    { children }
    : { children: React.ReactNode }
) {
    return (
        <div>
             배경 이미지
            <Image
                alt="Background"
                src="/Main_1.svg"
                quality={100}
                fill
                sizes="50vw"
                style={{
                    objectFit: 'cover',
                }}
            />
             콘텐츠 오버레이
            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </div>
    );
}