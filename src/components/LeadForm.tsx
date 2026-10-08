import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  formatAddress,
  getCities,
  getDealerByCode,
  getDealers,
  getProvinces,
  PRIVACY_POLICY_URL,
} from '@/data/dealers';
import { cn, normalizePhone } from '@/lib/utils';
import { leadSchema, type LeadFormValues } from '@/lib/validation';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DealerSelectItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

export type LeadSubmission = {
  firstName: string;
  lastName: string;
  dealerName: string;
  address: string;
  phone: string | null;
};

type LeadFormProps = {
  onSuccess: (submission: LeadSubmission) => void;
};

const fieldClass = 'space-y-1.5';

export function LeadForm({ onSuccess }: LeadFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      province: '',
      city: '',
      dealer: '',
      consent: false,
    },
  });

  const province = watch('province');
  const city = watch('city');
  const cities = province ? getCities(province) : [];
  const dealerOptions = province && city ? getDealers(province, city) : [];

  function changeProvince(value: string) {
    setValue('province', value, { shouldValidate: true });
    setValue('city', '', { shouldValidate: isSubmitted });
    setValue('dealer', '', { shouldValidate: isSubmitted });
  }

  function changeCity(value: string) {
    setValue('city', value, { shouldValidate: true });
    setValue('dealer', '', { shouldValidate: isSubmitted });
  }

  function onSubmit(values: LeadFormValues) {
    const dealer = getDealerByCode(values.dealer);
    if (!dealer) return;

    onSuccess({
      firstName: values.firstName,
      lastName: values.lastName,
      dealerName: dealer.name,
      address: formatAddress(dealer),
      phone: dealer.phone,
    });
  }

  return (
    <form className='mt-6' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-4 rounded-md border border-kia-line bg-white px-4 py-5 sm:px-5'>
        <div className={fieldClass}>
          <Label htmlFor='firstName' required>
            Nama depan
          </Label>
          <Input
            id='firstName'
            autoComplete='given-name'
            placeholder='Masukkan nama depan Anda'
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            {...register('firstName')}
          />
          <FieldError
            id='firstName-error'
            message={errors.firstName?.message}
          />
        </div>

        <div className={fieldClass}>
          <Label htmlFor='lastName' required>
            Nama belakang
          </Label>
          <Input
            id='lastName'
            autoComplete='family-name'
            placeholder='Masukkan nama belakang Anda'
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            {...register('lastName')}
          />
          <FieldError id='lastName-error' message={errors.lastName?.message} />
        </div>

        <div className={fieldClass}>
          <Label htmlFor='email' required>
            Email
          </Label>
          <Input
            id='email'
            type='email'
            autoComplete='email'
            inputMode='email'
            placeholder='Masukkan email Anda'
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          <FieldError id='email-error' message={errors.email?.message} />
        </div>

        <div className={fieldClass}>
          <Label htmlFor='phone' required>
            Nomor telepon
          </Label>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <div className='flex'>
                <span className='inline-flex h-11 items-center rounded-l-md border border-r-0 border-kia-line bg-[#fafafa] px-3 text-sm text-kia-black'>
                  +62
                </span>
                <Input
                  id='phone'
                  inputMode='numeric'
                  autoComplete='tel-national'
                  placeholder='81234567890'
                  className='rounded-l-none'
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={(event) =>
                    field.onChange(normalizePhone(event.target.value))
                  }
                />
              </div>
            )}
          />
          <FieldError id='phone-error' message={errors.phone?.message} />
        </div>

        <div className={fieldClass}>
          <Label htmlFor='province' required>
            Provinsi
          </Label>
          <Controller
            name='province'
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || undefined}
                onValueChange={changeProvince}>
                <SelectTrigger
                  id='province'
                  aria-invalid={!!errors.province}
                  aria-describedby={
                    errors.province ? 'province-error' : undefined
                  }
                  onBlur={field.onBlur}>
                  <SelectLabel
                    value={field.value}
                    placeholder='Silakan pilih provinsi.'
                  />
                </SelectTrigger>
                <SelectContent>
                  {getProvinces().map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError id='province-error' message={errors.province?.message} />
        </div>

        <div className={fieldClass}>
          <Label htmlFor='city' required>
            Kota
          </Label>
          <Controller
            name='city'
            control={control}
            render={({ field }) => (
              <Select
                key={province || 'kota'}
                value={field.value || undefined}
                onValueChange={changeCity}
                disabled={!province}>
                <SelectTrigger
                  id='city'
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                  onBlur={field.onBlur}>
                  <SelectLabel value={field.value} placeholder='Pilih kota' />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError id='city-error' message={errors.city?.message} />
        </div>

        <div className={fieldClass}>
          <Label htmlFor='dealer' required>
            Dealer
          </Label>
          <Controller
            name='dealer'
            control={control}
            render={({ field }) => (
              <Select
                key={`${province}-${city}`}
                value={field.value || undefined}
                onValueChange={(value) =>
                  setValue('dealer', value, { shouldValidate: true })
                }
                disabled={!city}>
                <SelectTrigger
                  id='dealer'
                  aria-invalid={!!errors.dealer}
                  aria-describedby={errors.dealer ? 'dealer-error' : undefined}
                  onBlur={field.onBlur}>
                  <SelectLabel
                    value={getDealerByCode(field.value)?.name}
                    placeholder='Pilih dealer'
                  />
                </SelectTrigger>
                <SelectContent>
                  {dealerOptions.map((dealer) => (
                    <DealerSelectItem
                      key={dealer.code}
                      value={dealer.code}
                      name={dealer.name}
                      detail={formatAddress(dealer)}
                    />
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError id='dealer-error' message={errors.dealer?.message} />
        </div>

        <div className='pt-2'>
          <p className='text-center text-xs font-bold tracking-wide text-kia-navy'>
            PERNYATAAN PRIVASI KAMI
          </p>
          <Controller
            name='consent'
            control={control}
            render={({ field }) => (
              <div className='mt-3 flex items-start gap-3'>
                <Checkbox
                  id='consent'
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                  onBlur={field.onBlur}
                  aria-invalid={!!errors.consent}
                  aria-describedby={
                    errors.consent ? 'consent-error' : undefined
                  }
                />
                <label
                  htmlFor='consent'
                  className='text-[13px] leading-5 text-kia-black'>
                  Saya menyetujui data saya disimpan dan diproses sesuai dengan
                  Ketentuan Penggunaan dan{' '}
                  <a
                    href={PRIVACY_POLICY_URL}
                    target='_blank'
                    rel='noreferrer'
                    className='font-semibold text-kia-navy underline underline-offset-2'
                    onClick={(event) => event.stopPropagation()}>
                    Kebijakan Privasi
                  </a>{' '}
                  dari Kia Indonesia.
                  {/* <span className="text-kia-error" aria-hidden="true">
                    {" "}
                    *
                  </span> */}
                </label>
              </div>
            )}
          />
          <FieldError id='consent-error' message={errors.consent?.message} />
        </div>
      </div>

      <button
        type='submit'
        className='mt-5 h-12 w-full rounded-full bg-kia-navy text-sm font-semibold text-white transition hover:bg-kia-navy-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kia-navy'>
        Kirimkan
      </button>
    </form>
  );
}

function SelectLabel({
  value,
  placeholder,
}: {
  value?: string;
  placeholder: string;
}) {
  return (
    <span className={cn('truncate', !value && 'text-kia-placeholder')}>
      {value || placeholder}
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className='text-[11px] text-kia-error'>
      <span aria-hidden='true'>* </span>
      {message}
    </p>
  );
}
