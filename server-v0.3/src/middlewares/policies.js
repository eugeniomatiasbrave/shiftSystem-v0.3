export const executePolicies = (policies) =>{
  return (req,res,next)=>{
      if(policies.includes('PUBLIC')) return next();
      if(policies.includes('AUTHORIZED')&& !req.user) return res.status(401).json({status:'error',message:'Unauthorized'});
      if(policies.includes(req.user?.role?.toUpperCase())) return next();
      return res.status(403).json({status:'error',message:'Forbidden'});
  }
  
}