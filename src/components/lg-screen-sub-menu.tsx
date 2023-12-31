import { useLanguage } from "@/hooks/useLanguage"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removeFromCart } from "../redux/cart.slice";

const LgScreenSubMenu = ({ countries, languages, setLanguageModal ,setLocationModal }: { countries: any, languages: any, setLanguageModal:any, setLocationModal:any }) => {

    const { t,locale } = useLanguage()
    const [domLoaded, setDomLoaded] = useState(false);

    const parts = locale ? locale?.split("-") : ["ae", "en"]
    const { data: session } = useSession()
    const cartItems = useSelector((state: RootState) => state.cart);
    
    const getFlagByLocale = () => {
        if (parts) {
            if (parts[0] === "sa") {
                return countries[1].flag
            }
            else {
                return countries[0].flag
            }
        }
        else {
            return countries[0].flag
        }
    }
    const getLanguageByLocale = () => {
        if (parts) {
            if (parts[1] === "ar") {
                return languages[1].name
            }
            else {
                return languages[0].name
            }
        }
        else {
            return languages[1].name
        }
    }

    const calculateTotalCartPrice = (): string => {
        let totalPrice: number = 0;
        cartItems.forEach((pro_data: any) => {
          totalPrice += pro_data.prices[0].price.regular_price * pro_data.quantity;
        });
        return parseFloat(totalPrice.toString()).toFixed(2);
      };
    
      const removedFromCart = () => {
        toast.info(`Cart Suceesfully Updated`);
      }

  const dispatch = useDispatch();

    useEffect(() => {
        setDomLoaded(true)
    }, [])

    return (

        <div className="grid grid-flow-col w-100  md:flex lg:flex my-auto h-12">

            <button className="mx-auto h-full flex items-center flex-col justify-between " onClick={() => { setLanguageModal(true) }}>
                <Image src={getFlagByLocale()} alt=""
                    className=" h-7 w-10 rounded-md object-cover border border-black" width={100} height={100} />
                <div className="text-[11px] text-center md:text-white ">{getLanguageByLocale()}</div>
            </button>

            {session ?
                <Link  className="  text-left  justify-between  flex-col pl-5  md:hidden lg:flex hidden" href="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-7 h-7 mx-auto fill-white" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                    <div className="text-[11px] text-center text-white">Account</div>
                </Link>
                : <a href="#" className=" flex-col md:hidden lg:flex hidden pl-5" onClick={() => { setLocationModal(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className=" my-auto text-white w-7 h-7 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                    <div className="text-[11px] text-center text-white">{t.navbar.account}</div>
                </a>}

            <a href="#" className=" justify-between  flex-col md:hidden lg:flex hidden   pl-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className=" text-white w-7 h-7 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <div className="text-[11px] text-center text-white whitespace-nowrap">{t.navbar.wishlist}</div>

            </a>
            <a href={`/cart`} className="justify-between flex-col md:hidden lg:flex hidden relative cart group/cart pl-5">
                {domLoaded ?
                    cartItems && cartItems.length != 0 ?
                        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500  rounded-full -top-2 -right-2 "> {cartItems.length}</div>
                        : null : null}

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-7 h-7 fill-white" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
                <div className="text-[11px] text-center text-white" >{t.navbar.cart}</div>

                {domLoaded && cartItems && cartItems.length > 0 ?
                    <div className="group-hover/cart:scale-100  scale-0 absolute w-[25rem] top-[3rem] right-0 bg-white rounded-lg px-3 py-2  h-fit  shadow-lg z-30">
                        <div className="overflow-y-auto h-fit max-h-[20rem] px-2">
                            {cartItems.map((item: any) => (
                                <>
                                    <div className="flex py-2">
                                        <a href={`/product/${item.slug}`} className="w-3/4 text-sm  my-auto">{item.title}</a>
                                        <div className="w-1/4 flex">
                                            <a href={`/product/${item.slug}`} className="w-3/4">
                                                <Image src={item.images.featured_image} height={100} width={100} className="w-full m-1" alt={item.title} />
                                            </a>
                                            <button onClick={() => {
                                                dispatch(removeFromCart(item.id))
                                                removedFromCart()
                                            }
                                            } className="w-1/4 ml-2 my-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 fill-red-500">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div className="bg-gray-300 h-[1px] w-11/12 mx-auto mt-2"></div>
                                </>
                            ))}
                        </div>

                        <div className="py-3">
                            <div className="flex justify-between ">
                                <div>TOTAL <span className="text-xs">(WITHOUT SHIPPING)</span> </div>
                                <div className="">AED {calculateTotalCartPrice()}</div>
                            </div>
                        </div>
                        <div className="py-3 flex justify-between text-white space-x-3">
                            <a href={`/cart`} className="bg-[#39f] px-3 py-1 w-full text-center" >CART</a>
                            <button className="bg-[#39f] px-3 py-1 w-full">CHECK OUT</button>
                        </div>
                    </div>
                    : null}
            </a>
        </div>
    )
}

export default LgScreenSubMenu