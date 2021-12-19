import Link from "next/link";

const About = () => {
  return (
    <div id="about" className="py-10 mt-16 mb-60 ">
      <h1 className="mb-20 font-mono text-6xl font-semibold text-center text-gray-100 uppercase">
        PROJE HAKKINDA
      </h1>
      <div className="container relative max-w-6xl py-3 pt-16 mx-auto mt-20 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 transform shadow-lg gradient-background -skew-y-6sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="font-mono text-3xl font-bold text-gray-900 underlined">
                RANDOM FANS
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="space-y-2 list-disc">
                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      <code className="font-semibold text-gray-900">53</code>{" "}
                      ERC-721 NFT'si.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      Tamamen rastgele, yüksek kalitede taraftar NFT'leri.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">
                      30.000'den fazla farklı özellik olasılığı, Nadirlik
                      seviyeleri.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex items-center h-6 sm:h-7">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-cyan-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="ml-2">Her bir NFT fiyatı 0.1 TBITCI</p>
                  </li>
                </ul>
              </div>
              <div className="pt-6 text-base leading-6 font-extralight sm:text-lg sm:leading-7">
                <p></p>
                <p className="mt-8">
                  <Link href="#main">
                    <a className="text-cyan-600 hover:text-cyan-700"> Mintle</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
