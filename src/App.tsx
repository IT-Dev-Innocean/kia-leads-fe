import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ConsentNotes } from '@/components/ConsentNotes';
import { LeadForm, type LeadSubmission } from '@/components/LeadForm';
import { SuccessState } from '@/components/SuccessState';

export default function App() {
  const [submission, setSubmission] = useState<LeadSubmission | null>(null);

  return (
    <div className='flex min-h-svh flex-col bg-white'>
      <main className='mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-8 pb-10'>
        <img src='/kia-logo.svg' alt='Kia' className='mx-auto h-12 w-auto' />
        {/* <p className='mt-4 text-center text-sm leading-6 text-kia-muted'>
          Isi form ini untuk mengajukan penawaran harga dan dihubungi oleh
          dealer Kia Indonesia.
        </p> */}

        <p className='mt-4 text-center text-sm leading-6 text-kia-muted'>
          Isi form ini untuk mengajukan penawaran harga
        </p>

        <AnimatePresence mode='wait'>
          {submission ? (
            <motion.div
              key='success'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}>
              <SuccessState submission={submission} />
            </motion.div>
          ) : (
            <motion.div
              key='form'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}>
              <LeadForm onSuccess={setSubmission} />
              <ConsentNotes />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className='bg-kia-black py-4 text-center text-xs text-white/80'>
        © {new Date().getFullYear()} Kia Indonesia. Seluruh hak dilindungi.
      </footer>
    </div>
  );
}
