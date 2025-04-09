"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SubmitButton } from "../ui/submit-button";
import ReactQuillEditor from "./products/react-quill-editor";
import { DatePicker } from "./products/release-date";

interface ProductFormProps {
  categoryList: any;

  platformList: any;
  product?: any;
}

export default function ProductForm({
  categoryList,
  platformList,
  product,
}: ProductFormProps) {
  // const [state, action] = useActionState(insertProduct, undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [platformId, setPlatformId] = useState(0);
  const [specs, setSpecs] = useState({
    min: {
      os: "",
      cpu: "",
      gpu: "",
      ram: "",
      storage: "",
      directx: "",
    },
    rec: {
      os: "",
      cpu: "",
      gpu: "",
      ram: "",
      storage: "",
      directx: "",
    },
  });
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [banner, setBanner] = useState<string | null>(null);
  const router = useRouter();

  const handleCorverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // const data = await imageUpload(formData);
      // setBanner(data);
    }
  };

  // const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const newImages: string[] = [];
  //     for (const file of Array.from(files)) {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const data = await imageUpload(formData);
  //       newImages.push(data);

  //       setImages((prev) => [...prev, ...newImages]);
  //     }
  //   }
  // };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "rec",
    field: string
  ) => {
    const value = e.target.value;
    setSpecs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (product) {
      console.log("product", product);
      setDiscount(product.discount);
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setDateValue(product.releaseDate);
      setCategoryId(product.categoryId);
      setPlatformId(product.platformId);
      setDateValue(new Date(product.releaseDate));
      setBanner(product.banner);
      setSpecs({
        min: {
          os: product.minRequirement?.os || "",
          cpu: product.minRequirement?.cpu || "",
          gpu: product.minRequirement?.gpu || "",
          ram: product.minRequirement?.ram || "",
          storage: product.minRequirement?.storage || "",
          directx: product.minRequirement?.directx || "",
        },
        rec: {
          os: product.recRequirement?.os || "",
          cpu: product.recRequirement?.cpu || "",
          gpu: product.recRequirement?.gpu || "",
          ram: product.recRequirement?.ram || "",
          storage: product.recRequirement?.storage || "",
          directx: product.recRequirement?.directx || "",
        },
      });
      setImages(product.image.map((img: { image: string }) => img.image));
    }
  }, [product, categoryId, platformId]);

  return (
    <form className="mt-10">
      <div className="grid grid-cols-2 items-center gap-4 mb-10">
        <Input
          type="text"
          name="title"
          placeholder="제품 이름"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DatePicker initialDate={dateValue} setDateValue={setDateValue} />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Select
          name="category"
          value={product ? String(categoryId) : undefined}
          onValueChange={(value) => setCategoryId(Number(value))}
        >
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {categoryList.map((category: any) => (
              <SelectItem
                className="cursor-pointer"
                key={category.id}
                value={String(category.id)}
              >
                {category.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          name="platform"
          value={product ? String(platformId) : undefined}
          onValueChange={(value) => setPlatformId(Number(value))}
        >
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="플랫폼 선택" />
          </SelectTrigger>
          <SelectContent>
            {platformList.map((platform: any) => (
              <SelectItem
                className="cursor-pointer"
                key={platform.id}
                value={String(platform.id)}
              >
                {platform.platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Input
          name="price"
          type="number"
          placeholder="가격"
          className="mb-4"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Input
          name="discount"
          type="number"
          placeholder="할인율"
          className="mb-4"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </div>
      <ReactQuillEditor value={description} onChange={setDescription} />
      <div className="flex flex-col items-center justify-between+ gap-10 mt-5 mb-4">
        <div>
          <h2 className="mb-4">최소사양</h2>
          <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
            <p>운영체제</p>
            <Input
              type="text"
              placeholder="OS"
              value={specs.min.os}
              onChange={(e) => handleSpecChange(e, "min", "os")}
            />
            <p>프로세서</p>
            <Input
              type="text"
              placeholder="CPU"
              value={specs.min.cpu}
              onChange={(e) => handleSpecChange(e, "min", "cpu")}
            />
            <p>그래픽</p>
            <Input
              type="text"
              placeholder="GPU"
              value={specs.min.gpu}
              onChange={(e) => handleSpecChange(e, "min", "gpu")}
            />
            <p>메모리</p>
            <Input
              type="text"
              placeholder="RAM"
              value={specs.min.ram}
              onChange={(e) => handleSpecChange(e, "min", "ram")}
            />
            <p>저장공간</p>
            <Input
              type="text"
              placeholder="STORAGE"
              value={specs.min.storage}
              onChange={(e) => handleSpecChange(e, "min", "storage")}
            />
            <p>다이렉트 X</p>
            <Input
              type="text"
              placeholder="DIRECT X"
              value={specs.min.directx}
              onChange={(e) => handleSpecChange(e, "min", "directx")}
            />
          </div>
        </div>
        <div>
          <h2 className="mb-4">권장사양</h2>
          <div className="grid grid-cols-2 place-content-center gap-4 border p-4 rounded-md">
            <p>운영체제</p>
            <Input
              type="text"
              placeholder="OS"
              value={specs.rec.os}
              onChange={(e) => handleSpecChange(e, "rec", "os")}
            />
            <p>프로세서</p>
            <Input
              type="text"
              placeholder="CPU"
              value={specs.rec.cpu}
              onChange={(e) => handleSpecChange(e, "rec", "cpu")}
            />
            <p>그래픽</p>
            <Input
              type="text"
              placeholder="GPU"
              value={specs.rec.gpu}
              onChange={(e) => handleSpecChange(e, "rec", "gpu")}
            />
            <p>메모리</p>
            <Input
              type="text"
              placeholder="RAM"
              value={specs.rec.ram}
              onChange={(e) => handleSpecChange(e, "rec", "ram")}
            />
            <p>저장공간</p>
            <Input
              type="text"
              placeholder="STORAGE"
              value={specs.rec.storage}
              onChange={(e) => handleSpecChange(e, "rec", "storage")}
            />
            <p>다이렉트 X</p>
            <Input
              type="text"
              placeholder="DIRECT X"
              value={specs.rec.directx}
              onChange={(e) => handleSpecChange(e, "rec", "directx")}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-5">
          <h2 className="mb-5">커버 이미지</h2>

          {banner ? (
            <>
              <label
                htmlFor={"banner"}
                className="w-[200px] h-[150px] border flex items-center justify-center cursor-pointer ml-2"
              >
                <Image
                  src={banner}
                  alt="미리보기"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="cursor-pointer w-[200px] h-[150px] object-cover rounded-md"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id={"banner"}
                className="hidden"
                onChange={handleCorverImageChange}
              />
            </>
          ) : (
            <>
              <label
                htmlFor={"banner"}
                className="w-[200px] h-[150px] border flex items-center justify-center cursor-pointer ml-2"
              >
                <div className="btn-upload">+</div>
              </label>
              <input
                type="file"
                accept="image/*"
                id={"banner"}
                className="hidden"
                onChange={handleCorverImageChange}
              />
            </>
          )}
        </div>
      </div>
      <div>
        <h2 className="mb-5">이미지</h2>
        <div className="grid grid-cols-2 gap-5 place-items-center mb-8">
          {images.map((image, index) => (
            <div
              className="w-[150px] h-[100px] md:w-[200px] md:h-[150px] border relative"
              key={index}
            >
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => handleImageRemove(index)}
              />
            </div>
          ))}
          {images.length < 4 && (
            <>
              <label
                htmlFor={"images"}
                className="w-[150px] h-[100px] md:w-[200px] md:h-[150px] border flex items-center justify-center cursor-pointer"
              >
                <div className="btn-upload">+</div>
              </label>
              <input
                type="file"
                accept="image/*"
                id={"images"}
                className="hidden"
                // onChange={handleImagesChange}
              />
            </>
          )}
        </div>
      </div>
      <SubmitButton>제품 등록</SubmitButton>
    </form>
  );
}
