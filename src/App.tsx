import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Church, MapPin, Phone, User, Loader2 } from "lucide-react"

import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { cn } from "./lib/utils"

// Schema de validação
const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  address: z.string().min(5, "O endereço deve ser mais detalhado."),
  phone: z.string().min(10, "Informe um número de telefone válido com DDD."),
})

type FormData = z.infer<typeof formSchema>

function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orbe 1 - Azul Ciano Escuro */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/30 rounded-full blur-[128px]"
      />
      
      {/* Orbe 2 - Variação para movimento */}
      <motion.div
        animate={{
          x: [0, -70, 30, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-950/40 rounded-full blur-[128px]"
      />

       {/* Orbe 3 - Central sutil */}
       <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-950/20 rounded-full blur-[100px]"
      />
    </div>
  )
}

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // ⚠️ IMPORTANTE: Substitua a URL abaixo pelo seu Webhook do Make
      const WEBHOOK_URL = "https://hook.us2.make.com/cxp2j6xfl93v5syxvfel4978u8y6tywi"

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para o Make")
      }
      
      console.log("Dados enviados:", data)
      setSubmitted(true)
    } catch (error) {
      console.error("Erro no envio:", error)
      alert("Houve um erro ao enviar o cadastro. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <BackgroundOrbs />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 text-center space-y-4 bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 max-w-md w-full"
        >
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center">
               <Church className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Cadastro Recebido!</h2>
          <p className="text-zinc-400">Deus abençoe. Entraremos em contato em breve.</p>
          <Button 
            onClick={() => setSubmitted(false)}
            variant="outline" 
            className="mt-6 w-full border-zinc-700 hover:bg-zinc-800 hover:text-white bg-transparent"
          >
            Voltar
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <BackgroundOrbs />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md space-y-8"
      >
        {/* Logo Placeholder */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="h-24 w-24 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 flex items-center justify-center shadow-2xl shadow-cyan-900/20 p-4">
             <img src="/simbolo.png" alt="Logo Batista Genesis" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-xl font-medium tracking-wide text-zinc-200">Igreja Batista Génesis</h1>
            <span className="text-sm text-zinc-400">Riacho Fundo 2</span>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="mb-6 space-y-1">
            <h2 className="text-xl font-semibold text-white">Bem-vindo</h2>
            <p className="text-sm text-zinc-400">Preencha seus dados para mantermos contato.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-400 text-xs uppercase tracking-wider pl-1">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="name"
                  placeholder="Seu nome"
                  {...register("name")}
                  className={cn(
                    "pl-10 bg-black/20 border-zinc-800 focus:border-cyan-700/50 focus:ring-cyan-900/20 text-white placeholder:text-zinc-600 transition-all h-11 rounded-xl",
                    errors.name && "border-red-500/50 focus:border-red-500/50"
                  )}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs pl-1">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-zinc-400 text-xs uppercase tracking-wider pl-1">Endereço</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="address"
                  placeholder="Rua, Número, Bairro"
                  {...register("address")}
                  className={cn(
                    "pl-10 bg-black/20 border-zinc-800 focus:border-cyan-700/50 focus:ring-cyan-900/20 text-white placeholder:text-zinc-600 transition-all h-11 rounded-xl",
                    errors.address && "border-red-500/50 focus:border-red-500/50"
                  )}
                />
              </div>
              {errors.address && (
                <p className="text-red-400 text-xs pl-1">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-zinc-400 text-xs uppercase tracking-wider pl-1">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                  className={cn(
                    "pl-10 bg-black/20 border-zinc-800 focus:border-cyan-700/50 focus:ring-cyan-900/20 text-white placeholder:text-zinc-600 transition-all h-11 rounded-xl",
                    errors.phone && "border-red-500/50 focus:border-red-500/50"
                  )}
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs pl-1">{errors.phone.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-12 bg-white text-black hover:bg-zinc-200 rounded-xl mt-4 font-semibold transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar Cadastro"
              )}
            </Button>

          </form>
        </div>
      </motion.div>
    </div>
  )
}
