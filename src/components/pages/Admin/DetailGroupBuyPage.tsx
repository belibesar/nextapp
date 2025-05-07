"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Info, MapPin, Minus, Plus, ShoppingBag, Users } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip"
import { GroupBuy, ProductType, UserType } from "@/types/types"

export default function DetailGroupBuyPage({user}:{user:UserType}) {    
    const params = useParams()
    const [groupBuy, setGroupBuy] = useState<GroupBuy | null>(null)
    const [product, setProduct] = useState<ProductType | null>(null) 
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true); // Set modal visibility to true when button is clicked
      };
    
      const closeModal = () => {
        setIsModalOpen(false); // Close the modal by setting visibility to false
      }

    useEffect(()=>{
        async function fetchGroupBuy() {
            try {
                const res = await fetch(`http://localhost:3000/api/group-buys/${params.id}`)
                const data = await res.json()

                const productRes = await fetch(`http://localhost:3000/api/products/${data[0].productId}`)
                const productData = await productRes.json()
                setGroupBuy(Array.isArray(data) ? data[0] : data)
                setProduct(Array.isArray(productData) ? productData[0] : productData)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }
        if(params.id) {
            fetchGroupBuy()
        }
    },[params.id])

    useEffect(() => {
        if (groupBuy?.minUserOrder) {
          setQuantity(groupBuy.minUserOrder)
        }
    }, [groupBuy?.minUserOrder])

    const [quantity, setQuantity] = useState<number | null> (null)
    const pricePerUnit = groupBuy?.price || 0
    const minQuantity = groupBuy?.minUserOrder || 1
    const maxQuantity = groupBuy?.maxTargetQuantity || 10

  // Mock data for group buy progress
  const currentParticipants = groupBuy?.participants.length || 1
  const targetParticipants = 30
  const progressPercentage = ((currentParticipants ?? 1) / (targetParticipants ?? 10)) * 100 //change this next time

  // data for remaining time
    const currentDate = new Date()
    const deadlineDate = new Date(groupBuy?.deadline || currentDate)
    const timeDiff = deadlineDate.getTime() - currentDate.getTime()
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    const daysLeft = dayDiff

    const deadlineDateString = new Date(groupBuy?.deadline?.toString() || "").toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const increaseQuantity = () => {
    if ((quantity ?? 0) < maxQuantity) {
      setQuantity((quantity ?? 0) + 1)
    }
  }

  const decreaseQuantity = () => {
    if ((quantity ?? 0) > 1) {
      setQuantity((quantity ?? 0) - 1)
    }
  }

  const totalPrice = (quantity ?? 0) * pricePerUnit
  const downPayment = totalPrice * 0.1 // 10% DP

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID").format(amount)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        <Button className="mb-6">
          <Link href="/groupbuy" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-6">
              <div className="relative aspect-square">
                <Image src={product?.img ||"https://placehold.co/600x600"} alt="Product Image" fill className="object-cover" />
                <Badge className="absolute top-4 right-4 bg-blue-600 text-white">Group Buy</Badge>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="text-yellow-600 bg-yellow-50 border-yellow-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {daysLeft} hari tersisa
                  </Badge>
                  <Badge className="text-green-600 bg-green-50 border-green-200">
                    <Users className="h-3 w-3 mr-1" />
                    {currentParticipants} peserta
                  </Badge>
                </div>

                <h2 className="text-2xl font-bold">{groupBuy?.productName}</h2>
                <p className="text-sm text-gray-500 mb-4">ID {groupBuy?._id?.toString()}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress Group Buy</span>
                    <span className="font-medium">
                      {currentParticipants}/{targetParticipants} peserta
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Deadline</div>
                      <div className="text-sm text-gray-600">{deadlineDateString}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Lokasi Distribusi</div>
                      <div className="text-sm text-gray-600">{groupBuy?.distributionLocation || 'Jakarta'}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShoppingBag className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Min. Pembelian</div>
                      <div className="text-sm text-gray-600">{minQuantity} Paket</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShoppingBag className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Maks. Pembelian</div>
                      <div className="text-sm text-gray-600">{maxQuantity} Paket</div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-semibold mb-2">Deskripsi Produk</h3>
                  <p className="text-gray-600">
                    {groupBuy?.description || "Deskripsi produk tidak tersedia."}
                  </p>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Info className="h-4 w-4 mr-2 text-blue-600" />
                  Informasi Group Buy
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-5 w-5 bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span>Pembayaran DP 10% untuk bergabung dengan group buy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-5 w-5 bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span>Sisa pembayaran dilakukan setelah group buy terpenuhi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-5 w-5 bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span>Pengiriman dilakukan 7-14 hari setelah semua peserta melunasi pembayaran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full h-5 w-5 bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <span>DP tidak dapat dikembalikan jika Anda membatalkan pesanan</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-bold">Rp. {formatCurrency(pricePerUnit)}</div>
                  <div className="text-sm text-gray-500">per paket</div>
                </div>

                <Separator className="mb-6" />

                <div className="mb-6">
                    <h3 className="font-semibold mb-4">Jumlah Pesanan</h3>

                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={decreaseQuantity}
                            disabled={(quantity ?? 0) <= 1}
                            className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center duration-200">
                            <Minus className="h-6 w-6 text-white" />
                        </button>
                        
                        <div className="text-3xl font-semibold">{quantity}</div>
                        <button
                            onClick={increaseQuantity}
                            disabled={(quantity ?? 0) >= maxQuantity}
                            className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center duration-200">
                            <Plus className="h-6 w-6 text-white" />
                        </button>
                    </div>
                    <div className="text-center text-sm text-gray-500 mb-6">Paket</div>

                  {(quantity ?? 0) < minQuantity && (
                    <div className="text-center text-sm text-red-500 mb-4">
                      Minimal pembelian adalah {minQuantity} paket
                    </div>
                  )}
                </div>

                <Separator className="mb-6" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga per Paket</span>
                    <span>Rp. {formatCurrency(pricePerUnit)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah</span>
                    <span>{quantity} Paket</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>Total Harga</span>
                    <span>Rp. {formatCurrency(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between text-blue-600">
                    <span>DP (10%)</span>
                    <span>Rp. {formatCurrency(downPayment)}</span>
                  </div>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="w-full">
                        <Button
                          className={`${(quantity ?? 0) < minQuantity ? "w-full bg-gray-300 hover:bg-gray-400 h-12 text-base"
                            : "w-full bg-blue-600 hover:bg-blue-700 h-12 text-base hover:cursor-pointer"}`}
                          onClick={openModal}
                          disabled={(quantity ?? 0) < minQuantity}
                        >
                          Join Group Buy
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <div className="flex justify-center mt-1">
                    {(quantity ?? 0) < minQuantity && (
                      <TooltipContent side="top" sideOffset={10} className="flex flex-col items-center justify-center text-center">
                        <p>Minimal pembelian adalah {minQuantity} paket</p>
                      </TooltipContent>
                    )}
                    </div>
                    
                  </Tooltip>
                </TooltipProvider>

                {(quantity ?? 0) < minQuantity ? (
                    <div className="mt-10 text-center text-sm text-gray-500">
                        Minimal pembelian adalah {minQuantity} paket.{" "}
                        <Link href="#" className="text-blue-600 hover:underline">
                        Syarat & Ketentuan
                        </Link>{" "}
                        kami
                    </div>
                ) : (
                    <div className="mt-5 text-center text-sm text-gray-500">
                        Dengan bergabung, Anda setuju dengan{" "}
                        <Link href="#" className="text-blue-600 hover:underline">
                        Syarat & Ketentuan
                        </Link>{" "}
                        kami
                    </div>
                )}
              </CardContent>
            </Card>
            {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            
            <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full h-[350px]">
                <button
                    onClick={closeModal}
                    className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-xl font-bold w-10 h-10">
                    &times;
                </button>

                <h3 className="text-2xl font-bold text-center mb-4">Payment</h3>
                <p className="text-center mb-4 text-sm">Transfer to this Account to finish payment</p>

                <div className="flex justify-between mt-2">
                    <h3 className="font-semibold">23908593408590</h3>
                    <h3 className="font-semibold">10% DP</h3>
                </div>
                <div className="flex justify-between">
                    <p>{user.bankAccount?.name}</p>
                    <h3 className="font-semibold">Total</h3>
                </div>
                <div className="flex justify-between">
                    <p>{product?.producer && product?.producer.name}</p>
                    <h3 className="font-semibold">Rp. {formatCurrency(totalPrice)}</h3>
                </div>

                <div className="flex flex-col justify-center mt-2">
                    <p className="text-sm font-semibold text-center mt-5">Upload your transfer note</p>
                    <button className="self-center w-50 items-center text-center bg-gray-600 text-sm text-white p-1 rounded-md hover:cursor-pointer hover:bg-gray-700">Choose your file</button>
                </div>

                <div className="flex flex-col justify-center mt-5">
                    <p className="text-xs text-center">Press this button if payment process already finished</p>
                    <button className="self-center w-30 bg-blue-400 rounded-md hover:bg-blue-300 hover:cursor-pointer text-sm font-semibold text-white mt-1 pt-1 pb-1">Pay</button>
                </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </main>
    </div>
  )
}
