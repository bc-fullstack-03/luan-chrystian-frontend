import { useState, useEffect } from "react";
import { Input } from "./Input";
import { InputUpdate } from "./InputUpdate";
import { Calendar } from 'phosphor-react'
import { useAuth } from "../hooks/contexts/authContext";
import { api } from "../services/api";
import { InputSelect } from "./InputSelect";

export function Biography() {
    const [inputValue, setInputValue] = useState<string>()
    const [birth, setBirth] = useState<Biography>()
    const [gender, setGender] = useState<Biography>()
    const [relationshipStatus, setRelationshipStatus] = useState<Biography>()

    const { authEmail, token }: any = useAuth()

    async function handleBirthday() {
        const birthdate = inputValue

        const birthBodyRequest = {
            type: "birth",
            value: birthdate
        }

        try {
            await api.post(`/user/biography/new`, birthBodyRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                alert("Data atualizada")
            })

        } catch (error) {
            alert(error)
        }
    }

    async function handleGender() {
        const gender = inputValue

        const genderBodyRequest = {
            type: 'gender',
            value: gender
        }

        try {
            await api.post(`/user/biography/new`, genderBodyRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                alert("Gênero atualizado com sucesso")
            })

        } catch (error) {
            alert(error)
        }
    }

    async function handleRelationship() {
        const status = inputValue

        const statusBodyRequest = {
            type: 'relationship',
            value: status
        }

        try {
            await api.post(`/user/biography/new`, statusBodyRequest, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                alert("Status de relacionamento atualizado com sucesso")
            })

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
                    <option disabled value="">Selecione</option>
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
                    <option disabled value="">Selecione</option>
                    <option value="Solteiro">Solteiro&#40;a&#41;</option>
                    <option value="Namorando">Namorando</option>
                    <option value="Casado">Casado&#40;a&#41;</option>
                    <option value="Outro">Outro</option>
                </InputSelect>
            </div>
        </div>
    )
}