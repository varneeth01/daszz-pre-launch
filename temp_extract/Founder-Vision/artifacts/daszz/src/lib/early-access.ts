export async function submitEarlyAccessLead(name: string, email: string) {
  // TODO: Connect to Supabase or Firebase here
  // e.g., await supabase.from('early_access_leads').insert([{ name, email }]);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}
