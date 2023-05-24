import { useState, useEffect } from "react";
import { Input } from "./Input";
import { InputUpdate } from "./InputUpdate";
import { Calendar } from 'phosphor-react'
import { useAuth } from "../hooks/contexts/authContext";
import { api } from "../services/api";
import { InputSelect } from "./InputSelect";
import { Loading } from "./Loading";

export function Biography() {
    const [inputValue, setInputValue] = useState<string>()
    const [birth, setBirth] = useState<Biography>()
    const [gender, setGender] = useState<Biography>()
    const [relationshipStatus, setRelationshipStatus] = useState<Biography>()
    const [isLoading, setIsLoading] = useState<boolean>()

    const { authEmail, token }: any = useAuth()

    async function handleBirthday() {
        const birthdate = inputValue
        setInputValue('')
        setIsLoading(true)

        const birthBodyRequest = {
            type: "birth",
            value: birthdate
        }

        try {
            if (birth) {
                await api.patch(`user/biography/update/${birth.id}`, birthBodyRequest, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    setIsLoading(false)
                })

            } else {
                await api.post(`/user/biography/new`, birthBodyRequest, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    setIsLoading(false)
                })
            }

        } catch (error) {
            alert("Erro in handleBirthDay function on component Biography.tsx in page Profile.tsx" + error)
        }
    }

    async function handleGender() {
        const genderValue = inputValue
        setInputValue('')
        setIsLoading(true)


        const genderBodyRequest = {
            type: 'gender',
            value: genderValue
        }

        try {
            if (gender) {
                await api.patch(`/user/biography/update/${gender.id}`, genderBodyRequest, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    setIsLoading(false)
                })

            } else {
                await api.post(`/user/biography/new`, genderBodyRequest, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    setIsLoading(false)
                })
            }

        } catch (error) {
            alert("Error on handleGender function in component Biography.tsx on page Profile.tsx" + error)
        }
    }

    async function handleRelationship() {
        const status = inputValue
        setInputValue('')
        setIsLoading(true)

        const statusBodyRequest = {
            type: 'relationship',
            value: status
        }

        try {
            if (relationshipStatus) {
                await api.patch(`/user/biography/update/${relationshipStatus.id}`, statusBodyRequest, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    setIsLoading(false)
                })

            } else {
                await api.post(`/user/biography/new`, statusBodyRequest, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    setIsLoading(false)
                })
            }

        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        async function fetchBiography() {
            const email: string = authEmail.replace(/"/g, "")

            const response = await api.get(`/user/email?email=${email}`)
            const biography: Biography[] = response.data.biography

            biography.forEach(bio => {
                if (bio.type == 'birth') {
                    setBirth(bio)
                }

                if (bio.type == 'gender') {
                    setGender(bio)
                }

                if (bio.type == 'relationship') {
                    setRelationshipStatus(bio)
                }
            })
        }

        fetchBiography()

    }, [birth, gender, relationshipStatus])

    return (
        <div className="flex flex-col items-center">
            <Loading isLoading={isLoading} />

            <InputUpdate
                title={`${!birth ? 'Insira aqui' : 'Algum errado? Altere agora!'}`}
                placeholder="Sua data de nascimeto"
                onChange={(event: any) => setInputValue(event.target.value)}
                handle={handleBirthday}
                icon={Calendar}
                type="date" >

                <Input readOnly title="Data de nascimento" value={birth?.value} placeholder="Data de nascimento" icon={Calendar} type="text" />
            </InputUpdate>

            <div className="flex gap-3 items-center">
                <div className="w-[250px]">
                    <Input readOnly title="Seu gênero" value={gender?.value} placeholder="Selecione seu gênero" icon={Calendar} type="text" />
                </div>

                <InputSelect selectId="gender" title="Gender" onChange={(event: any) => { setInputValue(event.target.value) }} handle={handleGender}>
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                </InputSelect>
            </div>

            <div className="flex gap-3 items-center">
                <div className="w-[250px]">
                    <Input readOnly title="Seu status" value={relationshipStatus?.value} placeholder="Status de relacionamento" icon={Calendar} type="text" />
                </div>

                <InputSelect selectId="status" title="Status de relaciomento" onChange={(event: any) => { setInputValue(event.target.value) }} handle={handleRelationship}>
                    <option value="">Selecione</option>
                    <option value="Solteiro">Solteiro&#40;a&#41;</option>
                    <option value="Namorando">Namorando</option>
                    <option value="Casado">Casado&#40;a&#41;</option>
                    <option value="Outro">Outro</option>
                </InputSelect>
            </div>
        </div>
    )
}