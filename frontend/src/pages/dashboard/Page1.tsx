import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { AlunoFormData } from "@/types/AlunoFormData";

const tabItems = [
  { value: "info_aluno", label: "Aluno" },
  { value: "info_familia", label: "Responsáveis" },
  { value: "endereco", label: "Endereço" },
  { value: "dados_adicionais", label: "Dados Adicionais" },
];

const AnimatedTabs = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(tabItems[0].value);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        setActiveTab(value);
        setActiveIndex(tabItems.findIndex((item) => item.value === value));
      }}
      className="w-full max-w-3xl relative"
    >
      <TabsList className="grid w-full grid-cols-4 relative border-2 dark:border-muted border-muted-foreground/20">
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-primary-foreground rounded-md z-10 w-[90%]"
          initial={false}
          animate={{
            width: `${100 / tabItems.length}%`,
            x: `${activeIndex * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
        {tabItems.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="relative z-20 text-primary data-[state=active]:text-accent mx-2"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};
const Page1: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<AlunoFormData>();

  const onSubmit: SubmitHandler<AlunoFormData> = (data) => {
    console.log(data);
  };

  const handleBornDateChange = (date: Date | null) => {
    setValue("data_nascimento", date ? date.toISOString().split("T")[0] : "");
  };
  const handleRgDateChange = (date: Date | null) => {
    setValue(
      "registroGeral.data_emissao_rg",
      date ? date.toISOString().split("T")[0] : ""
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mx-4 lg:mx-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatedTabs>
          <TabsContent value="info_aluno">
            <Card>
              <CardHeader>
                <CardDescription>Informações do Aluno</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {/* Nome */}
                  <div className="flex flex-col items-center justify-center">
                    <Label htmlFor="nome" className="text-gray-500">
                      Nome
                    </Label>
                    <Input
                      id="nome"
                      {...register("nome")}
                      placeholder="Nome do aluno"
                    />
                  </div>

                  {/* Gênero */}
                  <div className="flex flex-col">
                    <Label htmlFor="genero" className="text-gray-500">
                      Gênero
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("genero", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o gênero do aluno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* CPF */}
                  <div className="flex flex-col">
                    <Label htmlFor="cpf" className="text-gray-500">
                      CPF
                    </Label>
                    <Input
                      id="cpf"
                      {...register("registroGeral.cpf")}
                      placeholder="Digite o CPF"
                    />
                  </div>
                  {/* Data de Nascimento */}
                  <div className="flex flex-col">
                    <Label htmlFor="data_nascimento" className="text-gray-500">
                      Data de Nascimento
                    </Label>
                    <DatePicker
                      onDateChange={(date: Date) => handleBornDateChange(date)}
                    />
                  </div>
                  {/* RG */}
                  <div className="flex flex-col">
                    <Label htmlFor="rg" className="text-gray-500">
                      RG
                    </Label>
                    <Input
                      id="rg"
                      {...register("registroGeral.rg")}
                      placeholder="Digite o RG"
                    />
                  </div>

                  {/* Data de Emissão do RG */}
                  <div className="flex flex-col">
                    <Label htmlFor="data_emissao_rg" className="text-gray-500">
                      Data de Emissão do RG
                    </Label>
                    <DatePicker
                      onDateChange={(date: Date) => handleRgDateChange(date)}
                    />
                  </div>
                  {/* Telefone */}
                  <div className="flex flex-col">
                    <Label htmlFor="telefone" className="text-gray-500">
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      {...register("telefone")}
                      placeholder="(DDD) XXXXX-XXXX"
                    />
                  </div>

                  {/* Ano Escolar */}
                  <div className="flex flex-col">
                    <Label htmlFor="ano_escolar" className="text-gray-500">
                      Ano Escolar
                    </Label>
                    <Select
                      onValueChange={(value) => setValue("ano_escolar", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o ano escolar" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Não está na escola */}
                        <SelectItem value="none">Não está na escola</SelectItem>
                        {/* Pré Escolar I */}
                        <SelectItem value="pre-escolar-1">
                          Pré Escolar I
                        </SelectItem>
                        <SelectItem value="pre-escolar-2">
                          Pré Escolar II
                        </SelectItem>
                        {/* Ensino Fundamental I */}
                        <SelectItem value="fundamental-1-1ano">
                          Ensino Fundamental I - 1º ano
                        </SelectItem>
                        <SelectItem value="fundamental-1-2ano">
                          Ensino Fundamental I - 2º ano
                        </SelectItem>
                        <SelectItem value="fundamental-1-3ano">
                          Ensino Fundamental I - 3º ano
                        </SelectItem>
                        <SelectItem value="fundamental-1-4ano">
                          Ensino Fundamental I - 4º ano
                        </SelectItem>
                        <SelectItem value="fundamental-1-5ano">
                          Ensino Fundamental I - 5º ano
                        </SelectItem>

                        {/* Ensino Fundamental II */}
                        <SelectItem value="fundamental-2-6ano">
                          Ensino Fundamental II - 6º ano
                        </SelectItem>
                        <SelectItem value="fundamental-2-7ano">
                          Ensino Fundamental II - 7º ano
                        </SelectItem>
                        <SelectItem value="fundamental-2-8ano">
                          Ensino Fundamental II - 8º ano
                        </SelectItem>
                        <SelectItem value="fundamental-2-9ano">
                          Ensino Fundamental II - 9º ano
                        </SelectItem>

                        {/* Ensino Médio */}
                        <SelectItem value="medio-1ano">
                          Ensino Médio - 1º ano
                        </SelectItem>
                        <SelectItem value="medio-2ano">
                          Ensino Médio - 2º ano
                        </SelectItem>
                        <SelectItem value="medio-3ano">
                          Ensino Médio - 3º ano
                        </SelectItem>

                        {/* Formação Técnica e Superior */}
                        <SelectItem value="tecnico">Ensino Técnico</SelectItem>
                        <SelectItem value="superior-incompleto">
                          Ensino Superior (Incompleto)
                        </SelectItem>
                        <SelectItem value="superior-completo">
                          Ensino Superior (Completo)
                        </SelectItem>

                        {/* Pós-graduação e Outros */}
                        <SelectItem value="pos-graduacao">
                          Pós-graduação
                        </SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Turno */}
                  <div className="flex flex-col">
                    <Label
                      htmlFor="turno"
                      className="text-sm font-medium text-gray-500"
                    >
                      Turno
                    </Label>
                    <Select onValueChange={(value) => setValue("turno", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o turno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manha">Manhã</SelectItem>
                        <SelectItem value="tarde">Tarde</SelectItem>
                        <SelectItem value="noite">Noite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Renda Familiar */}
                  <div className="flex flex-col max-w-[254px]">
                    <Label
                      htmlFor="renda_familiar"
                      className="text-sm font-medium text-gray-500"
                    >
                      Renda Familiar ( Salários Min )
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("registroGeral.renda_familiar", Number(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a faixa salarial" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 a 1 SM (R$ 1.320)</SelectItem>
                        <SelectItem value="1">
                          1 a 2 S.M. (R$ 1.320 - R$ 2.640)
                        </SelectItem>
                        <SelectItem value="2">
                          2 a 3 S.M. (R$ 2.640 - R$ 3.960)
                        </SelectItem>
                        <SelectItem value="3">
                          3 a 4 S.M. (R$ 3.960 - R$ 5.280)
                        </SelectItem>
                        <SelectItem value="4">
                          4 a 6 S.M. (R$ 5.280 - R$ 7.920)
                        </SelectItem>
                        <SelectItem value="5">
                          6 a 8 S.M. (R$ 7.920 - R$ 10.560)
                        </SelectItem>
                        <SelectItem value="6">
                          8 a 10 S.M. (R$ 10.560 - R$ 13.200)
                        </SelectItem>
                        <SelectItem value="7">
                          10 a 15 S.M. (R$ 13.200 - R$ 19.800)
                        </SelectItem>
                        <SelectItem value="8">
                          15 a 20 S.M. (R$ 19.800 - R$ 26.400)
                        </SelectItem>
                        <SelectItem value="9">
                          {" "}
                          Acima de 20 S.M. (R$ 26.400)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-1 w-full items-center justify-center px-4 space-x-4 lg:space-x-8 py-4">
                  {/* Alfabetizado */}
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor="alfabetizado"
                      className="text-sm font-medium text-gray-500"
                    >
                      Alfabetizado
                    </Label>
                    <Checkbox id="alfabetizado" {...register("alfabetizado")} />
                  </div>
                  {/* Bolsa Família */}
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor="bolsa_familia"
                      className="text-sm font-medium text-gray-500"
                    >
                      Bolsa Família
                    </Label>
                    <Checkbox
                      id="bolsa_familia"
                      {...register("registroGeral.bolsa_familia")}
                    />
                  </div>
                  {/* Direito de Imagem */}
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor="direito_imagem"
                      className="text-sm font-medium text-gray-500"
                    >
                      Direito de Imagem
                    </Label>
                    <Checkbox
                      id="direito_imagem"
                      {...register("registroGeral.direito_imagem")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="info_familia">
            <Card className="pt-4">
              <CardContent>
                <div className="w-full flex flex-col md:h-auto p-4 my-4">
                  {/* Dados da Mãe */}
                  <CardDescription className="py-2">
                    Dados da Mãe / Responsável
                  </CardDescription>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {/* Com Quem Deixar os Filhos */}
                    <div className="flex flex-col space-y-2">
                      <Label
                        htmlFor="dadosMae.com_quem_deixar"
                        className="text-sm font-medium text-gray-500"
                      >
                        Tem Com Quem Deixar os Filhos?{" "}
                        <p className="text-xs text-white/20">
                          ( Se sim, quem? )
                        </p>
                      </Label>
                      <Input
                        id="dadosMae.com_quem_deixar"
                        {...register("dadosMae.com_quem_deixar")}
                        className="mt-1 p-2"
                        placeholder="Com quem deixar"
                      />
                    </div>

                    {/* Participa de Algum Projeto */}
                    <div className="flex flex-col space-y-2">
                      <Label
                        htmlFor="dadosMae.qual_projeto"
                        className="text-sm font-medium text-gray-500"
                      >
                        Participa de algum projeto?{" "}
                        <p className="text-xs text-white/20">
                          ( Se sim, qual? )
                        </p>
                      </Label>
                      <Input
                        id="dadosMae.qual_projeto"
                        {...register("dadosMae.qual_projeto")}
                        className="mt-1 p-2"
                        placeholder="Qual projeto?"
                      />
                    </div>
                    {/* Trabalha Fora */}
                    <div className="flex items-center space-x-2 justify-center">
                      <Label
                        htmlFor="dadosMae.trabalha_fora"
                        className="text-sm font-medium text-gray-500"
                      >
                        Trabalha Fora
                      </Label>
                      <Checkbox
                        id="dadosMae.trabalha_fora"
                        {...register("dadosMae.trabalha_fora")}
                      />
                    </div>
                    {/* Interesse em Culinária ou Costura */}
                    <div className="flex items-center space-x-2 justify-center">
                      <Label
                        htmlFor="dadosMae.interesse_culinaria_costura"
                        className="text-sm font-medium text-gray-500"
                      >
                        Interesse em Culinária ou Costura
                      </Label>
                      <Checkbox
                        id="dadosMae.interesse_culinaria_costura"
                        {...register("dadosMae.interesse_culinaria_costura")}
                      />
                    </div>
                  </div>
                  {/* FaMILIARES */}
                  <CardDescription className="py-4">Familiares</CardDescription>
                  <div className="flex justify-around">
                    {/* Número de Filhos */}
                    <div className="flex flex-col mb-4 space-y-2">
                      <Label
                        htmlFor="numero_filhos"
                        className="text-sm font-medium text-gray-500"
                      >
                        Número de Filhos
                      </Label>
                      <Input
                        id="numero_filhos"
                        {...register("familia.numero_filhos")}
                        className="text-center"
                        type="number"
                        placeholder="Número de filhos"
                      />
                    </div>

                    {/* Irmão na Instituição */}
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor="irmao_instituicao"
                        className="text-sm font-medium text-gray-500"
                      >
                        Irmão na Instituição ?
                      </Label>
                      <Checkbox
                        id="irmao_instituicao"
                        {...register("familia.irmao_instituicao")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="endereco">
            <Card className="pt-4">
              <CardHeader>
                <CardDescription>Endereço do Aluno</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {/* CEP */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="endereco.cep" className="text-gray-500">
                      CEP
                    </Label>
                    <Input
                      id="endereco.cep"
                      {...register("endereco.cep")}
                      className=""
                      placeholder="CEP"
                    />
                  </div>

                  {/* Logradouro */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="endereco.logradouro"
                      className="text-gray-500"
                    >
                      Logradouro
                    </Label>
                    <Input
                      id="endereco.logradouro"
                      {...register("endereco.logradouro")}
                      className=""
                      placeholder="Logradouro"
                    />
                  </div>

                  {/* Número */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="endereco.logradouro_numero"
                      className="text-gray-500"
                    >
                      Número
                    </Label>
                    <Input
                      id="endereco.logradouro_numero"
                      {...register("endereco.logradouro_numero")}
                      className=""
                      placeholder="Número"
                    />
                  </div>

                  {/* Complemento */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="endereco.complemento"
                      className="text-gray-500"
                    >
                      Complemento
                    </Label>
                    <Input
                      id="endereco.complemento"
                      {...register("endereco.complemento")}
                      className=""
                      placeholder="Complemento"
                    />
                  </div>

                  {/* Bairro */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="endereco.bairro" className="text-gray-500">
                      Bairro
                    </Label>
                    <Input
                      id="endereco.bairro"
                      {...register("endereco.bairro")}
                      className=""
                      placeholder="Bairro"
                    />
                  </div>

                  {/* Cidade */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="endereco.cidade" className="text-gray-500">
                      Cidade
                    </Label>
                    <Input
                      id="endereco.cidade"
                      {...register("endereco.cidade")}
                      className=""
                      placeholder="Cidade"
                    />
                  </div>

                  {/* UF */}
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="endereco.uf" className="text-gray-500">
                      UF
                    </Label>
                    <Input
                      id="endereco.uf"
                      {...register("endereco.uf")}
                      className=""
                      placeholder="UF"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="dados_adicionais">
            <Card className="pt-4 pb-8">
              <CardHeader>
                <CardDescription>Dados Adicionais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {/* Tipo de Residência */}
                  <div className="">
                    <Label
                      htmlFor="dadosAdicionais.tipo_residencia"
                      className="text-gray-500"
                    >
                      Tipo de Residência
                    </Label>
                    <Input
                      id="dadosAdicionais.tipo_residencia"
                      {...register("dadosAdicionais.tipo_residencia")}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Tipo de Residência"
                    />
                  </div>

                  {/* Número de Cômodos */}
                  <div className="">
                    <Label
                      htmlFor="dadosAdicionais.numero_comodos"
                      className="text-gray-500"
                    >
                      Número de Cômodos
                    </Label>
                    <Input
                      id="dadosAdicionais.numero_comodos"
                      {...register("dadosAdicionais.numero_comodos")}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      type="number"
                    />
                  </div>

                  {/* CPF na Nota Fiscal */}
                  <div className="flex w-40 justify-between mx-auto">
                    <Label
                      htmlFor="dadosAdicionais.cpf_nota_fiscal"
                      className="text-gray-500"
                    >
                      CPF na Nota Fiscal
                    </Label>
                    <Checkbox
                      id="dadosAdicionais.cpf_nota_fiscal"
                      {...register("dadosAdicionais.cpf_nota_fiscal")}
                    />
                  </div>

                  {/* Possui Banheiro */}
                  <div className="flex w-40 justify-between mx-auto">
                    <Label
                      htmlFor="dadosAdicionais.possui_banheiro"
                      className="text-gray-500"
                    >
                      Possui Banheiro
                    </Label>
                    <Checkbox
                      id="dadosAdicionais.possui_banheiro"
                      {...register("dadosAdicionais.possui_banheiro")}
                    />
                  </div>

                  {/* Possui Água */}
                  <div className="flex w-40 justify-between mx-auto">
                    <Label
                      htmlFor="dadosAdicionais.possui_agua"
                      className="text-gray-500"
                    >
                      Possui Água
                    </Label>
                    <Checkbox
                      id="dadosAdicionais.possui_agua"
                      {...register("dadosAdicionais.possui_agua")}
                    />
                  </div>

                  {/* Possui Luz */}
                  <div className="flex w-40 justify-between mx-auto">
                    <Label
                      htmlFor="dadosAdicionais.possui_luz"
                      className="text-gray-500"
                    >
                      Possui Luz
                    </Label>
                    <Checkbox
                      id="dadosAdicionais.possui_luz"
                      {...register("dadosAdicionais.possui_luz")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </AnimatedTabs>
        <div className="w-full py-2">
          <Button
            type="submit"
            className="w-full text-accent"
            variant="outline"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page1;
