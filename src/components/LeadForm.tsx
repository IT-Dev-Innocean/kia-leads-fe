import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type Control } from 'react-hook-form';
import { getCities, getProvinces, type Region } from '@/data/wilayah';
import { cn, normalizePhone } from '@/lib/utils';
import { leadSchema, type LeadFormValues } from '@/lib/validation';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchableSelect } from '@/components/ui/searchable-select';

export type LeadSubmission = {
  fullName: string;
  provinceName: string;
  cityName: string;
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
      fullName: '',
      email: '',
      phone: '',
      province: '',
      city: '',
      crossBorderConsent: false,
      collectionPurposeConsent: false,
      thirdPartyConsent: false,
      marketingEmail: false,
      marketingSms: false,
      marketingPhone: false,
    },
  });

  const province = watch('province');
  const marketingEmail = watch('marketingEmail');
  const marketingSms = watch('marketingSms');
  const marketingPhone = watch('marketingPhone');
  const marketingValues = [marketingEmail, marketingSms, marketingPhone];
  const allMarketingChecked = marketingValues.every(Boolean);
  const marketingState = allMarketingChecked
    ? true
    : marketingValues.some(Boolean)
      ? 'indeterminate'
      : false;
  const [provinces, setProvinces] = useState<Region[]>([]);
  const [cities, setCities] = useState<Region[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [regionError, setRegionError] = useState('');

  useEffect(() => {
    let active = true;

    getProvinces()
      .then((items) => {
        if (active) setProvinces(items);
      })
      .catch(() => {
        if (active) setRegionError('Data provinsi gagal dimuat.');
      })
      .finally(() => {
        if (active) setLoadingProvinces(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!province) {
      setCities([]);
      setLoadingCities(false);
      return;
    }

    let active = true;
    setLoadingCities(true);
    setRegionError('');

    getCities(province)
      .then((items) => {
        if (active) setCities(items);
      })
      .catch(() => {
        if (active) {
          setCities([]);
          setRegionError('Data kota gagal dimuat.');
        }
      })
      .finally(() => {
        if (active) setLoadingCities(false);
      });

    return () => {
      active = false;
    };
  }, [province]);

  function changeProvince(value: string) {
    setValue('province', value, { shouldValidate: true });
    setValue('city', '', { shouldValidate: isSubmitted });
  }

  function changeCity(value: string) {
    setValue('city', value, { shouldValidate: true });
  }

  function setMarketingConsent(checked: boolean) {
    setValue('marketingEmail', checked, { shouldDirty: true });
    setValue('marketingSms', checked, { shouldDirty: true });
    setValue('marketingPhone', checked, { shouldDirty: true });
  }

  function onSubmit(values: LeadFormValues) {
    const provinceName = provinces.find(
      (item) => item.id === values.province
    )?.name;
    const cityName = cities.find((item) => item.id === values.city)?.name;
    if (!provinceName || !cityName) return;

    onSuccess({
      fullName: values.fullName,
      provinceName,
      cityName,
    });
  }

  return (
    <form className='mt-6' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='space-y-4 rounded-md border border-kia-line bg-white px-4 py-5 sm:px-5'>
        <div className={fieldClass}>
          <Label htmlFor='fullName' required>
            Nama lengkap
          </Label>
          <Input
            id='fullName'
            autoComplete='name'
            placeholder='Masukkan nama lengkap Anda'
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            {...register('fullName')}
          />
          <FieldError id='fullName-error' message={errors.fullName?.message} />
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
              <SearchableSelect
                id='province'
                value={field.value}
                options={provinces}
                placeholder={
                  loadingProvinces
                    ? 'Memuat provinsi...'
                    : 'Silakan pilih provinsi.'
                }
                searchPlaceholder='Cari provinsi'
                disabled={loadingProvinces || provinces.length === 0}
                invalid={!!errors.province}
                describedBy={errors.province ? 'province-error' : undefined}
                onChange={changeProvince}
                onBlur={field.onBlur}
              />
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
              <SearchableSelect
                key={province || 'kota'}
                id='city'
                value={field.value}
                options={cities}
                placeholder={loadingCities ? 'Memuat kota...' : 'Pilih kota'}
                searchPlaceholder='Cari kota'
                disabled={!province || loadingCities}
                invalid={!!errors.city}
                describedBy={errors.city ? 'city-error' : undefined}
                onChange={changeCity}
                onBlur={field.onBlur}
              />
            )}
          />
          <FieldError id='city-error' message={errors.city?.message} />
          {regionError ? (
            <p className='text-[11px] text-kia-error'>{regionError}</p>
          ) : null}
        </div>

        <div className='space-y-3 border-t border-kia-line pt-4'>
          <div>
            <p className='text-sm font-bold text-kia-black'>
              Informasi Persetujuan
            </p>
            <p className='mt-2 text-[12px] leading-5 text-kia-black'>
              <span className='text-kia-error' aria-hidden='true'>
                *{' '}
              </span>
              Pernyataan yang menginformasikan kepada pengguna mengenai masa
              penyimpanan data Kia dan hak untuk meminta penghapusan atau akses
              sesuai dengan hukum yang berlaku.
            </p>
            <p className='mt-3 text-[13px] leading-5 text-kia-black'>
              Silakan berikan persetujuan untuk hal-hal berikut:
            </p>
          </div>

          <div className='space-y-2.5'>
            <ConsentField
              id='crossBorderConsent'
              name='crossBorderConsent'
              label='Persetujuan Transfer Data Lintas Batas (Wajib)'
              control={control}
              error={errors.crossBorderConsent?.message}
            />
            <ConsentField
              id='collectionPurposeConsent'
              name='collectionPurposeConsent'
              label='Persetujuan Tujuan Pengumpulan Data (Wajib)'
              control={control}
              error={errors.collectionPurposeConsent?.message}
            />
            <ConsentField
              id='thirdPartyConsent'
              name='thirdPartyConsent'
              label='Persetujuan Pengungkapan kepada Pihak Ketiga (Wajib)'
              control={control}
              error={errors.thirdPartyConsent?.message}
            />

            <div className='flex items-start gap-2.5'>
              <Checkbox
                id='marketingConsent'
                checked={marketingState}
                onCheckedChange={(checked) =>
                  setMarketingConsent(checked === true)
                }
              />
              <label
                htmlFor='marketingConsent'
                className='text-[13px] leading-5 text-kia-black'>
                Persetujuan Pemasaran (Opsional)
              </label>
            </div>

            <div className='space-y-2 pl-6'>
              <ConsentField
                id='marketingEmail'
                name='marketingEmail'
                label='Saya setuju menerima pemasaran melalui Email (Opsional)'
                control={control}
                muted
              />
              <ConsentField
                id='marketingSms'
                name='marketingSms'
                label='Saya setuju menerima pemasaran melalui SMS (Opsional)'
                control={control}
                muted
              />
              <ConsentField
                id='marketingPhone'
                name='marketingPhone'
                label='Saya setuju menerima pemasaran melalui Telepon (Opsional)'
                control={control}
                muted
              />
            </div>
          </div>
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

function ConsentField({
  id,
  name,
  label,
  control,
  error,
  muted = false,
}: {
  id: string;
  name:
    | 'crossBorderConsent'
    | 'collectionPurposeConsent'
    | 'thirdPartyConsent'
    | 'marketingEmail'
    | 'marketingSms'
    | 'marketingPhone';
  label: string;
  control: Control<LeadFormValues>;
  error?: string;
  muted?: boolean;
}) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='flex items-start gap-2.5'>
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              onBlur={field.onBlur}
              aria-invalid={!!error}
              aria-required={!muted}
              aria-describedby={error ? `${id}-error` : undefined}
              className={muted ? 'border-[#d5d5d5]' : undefined}
            />
            <label
              htmlFor={id}
              className={cn(
                'text-[13px] leading-5',
                muted ? 'text-[#a3a3a3]' : 'text-kia-black'
              )}>
              {label}
            </label>
          </div>
        )}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
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
