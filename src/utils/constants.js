import RawTsvData from "../data/metro_feeder_list.tsv?raw";
import polyline from "polyline";
import {cleanupBusDataJson, readTSV} from "./index.js";
import _ from "lodash";

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const jsonData = readTSV(RawTsvData);
export const BUS_DATA = cleanupBusDataJson(jsonData);
export const ROUTE_LINES = {
  "MF1C": "ebbyMobjnAiA_@c@Eg@@iABaBBwB@gCCoBGmCGcB@y@Fq@Rg@`@g@v@aIxOs^~i@_I`PmNdXwZfl@gIjPsChGmHzN{C~FeB|C[zAMpALfJ\\fDhAjPd@pGh@|GE`GXrCxElXtCvXbEnPrBxIbAtDtFdKjDxGbAnAvQhQtN`MbXrVjFdBb\\lMxeA~`@~KpDlBr@xBFnDUnOwCzViFtKmCfKsAlJiAnGe@pEBfDZ|@HbCf@nAl@fBt@vBfBpZh^nHhGvBvA~BXrC`@rA?p`@kBrSs@tBGzCy@jIsAfAQpCAdGb@jFl@tBn@nCx@pIpA|FD",
  "MF1E": "cf{xMayinAy@vAq@nAaBnCmD~FIHA@ABCLE@E@EBy@P[JOHKJa@t@ABEJMXEDONOVMVEJGPCHITABAn@?`@?j@?T@R@h@?L@F?FPh@Lb@Nj@BPNp@ThAH^H^Nv@RxAFZBVD^Fl@F|@JfBJzALtAD`@D`@J|@BXBPJ`AB\\RhBDd@Fh@Fp@BPFd@LlADXD`@gBe@o@Q{@YeB_@UEMSMMQMa@Qe@M_@MkBi@i@Ik@IWCQAAFyC_AkFaBUGa@Ok@QgA_@aBi@MG[MkHmCuBw@uFoBSGiAc@a@MCAEASGsEeBe@QoE}AyEkBmCcAaBo@gHsCcC_A]OqCiAyCeA]M_Cs@cA_@YOUI[OsAc@KC_@OWIOE[Ii@MkBs@[K{@[WIGCUQCASKCCKGQIOGWIWI_@OA?oDmAqDmAa@OaA[m@Sg@QSUMIMGi@QEAi@SsAg@w@Y}CiAaBo@wHuC{Ak@aA]oBs@oAa@YIgBu@IEQIC?ICIAEAi@DG?C?m@AC?K?c@AiA@e@?c@@A?k@?g@Ay@EcAIiAAQKUCc@Cs@Ca@?m@@m@Bc@@m@Bg@@W@s@BkCDg@@{C@_A?gC@o@@o@?_BDyADW@]D{@Ho@Je@J_@LIDw@\\UL}@l@g@\\g@d@m@p@eAhAGFOPWVURMHUJ_@Ng@N]PaBp@}@^eA\\wBr@{FvAoFnAaAZkBj@_@L{@Xg@NQBUDc@HS@E?g@DYDiCRgAH{BZo@J_@J[H{@Tg@Nc@Nu@L[FgAPsBXs@Nc@H}AToARy@NQBw@NuB`@e@Fm@JgBXQD}AXw@LYFQBi@D]BWB_ABK?A?Q@mBB}@@[@kABc@?a@@qA@oB@kA?U?[@iA@y@@u@B]@S@eAF_AHwEt@{Cr@i@NaAV[JKBmAVI@O@]@KAe@EqASKCkCe@SEYEUEMAMASA_@?q@@iA@_BB[@{A?m@?K?m@?SAg@?U?S@[@M@OBSBQDwAl@_@RuAt@qAp@KDkAh@o@VSH[HYFm@La@JMBMBUDi@JMBeARmB^A?gCf@k@LCBYHYNYLSJOFYPMF[RQHMFODQDSDi@H_ANkAPqBVgD^]DkALwBVE?K@WB{ANyD\\WBa@BQBQ@[B[Ds@FoBNE@Y@a@D_@@Y@S?iCTg@Di@FmBNI?g@Bu@Bc@@mB?_C?S?kC?sC?w@?A?k@?g@?[?y@@c@?M@UBC@eANc@F_Dh@e@FgBZoARa@H]DiFx@{AP]FQBqCl@c@LYFcAXaHnBSFgGzAoEhA_B`@q@No@Nm@Ps@Re@Jm@No@L]FM?U@a@BkAHi@Bk@Fs@DUBUBk@FE@K@SDIB[HC@_AXKDqBp@WJi@NYHYD]DQBA?]Da@DwANmCTq@@O@E?[C_BIoBMaCQ{BQaAKi@KE?s@IGAS?CAS@O@S@]HUBg@JA?o@Jq@Fu@Bm@?sAGgCOUEC?KCAAE?_@QEEUOGEAAIISMMGOEg@Im@Is@IWEW@]DaAJc@BO@C?S?q@Cc@Ae@CYCMAq@Eo@QKCQAQG{@WCA",
  "MF1F": "c`|xMiignAoA]i@Ik@IWCQAAFyC_AkFaBUG?T@f@@VAx@A\\Mz@Of@M\\Qd@Wl@CB{@jBa@|@w@zAS^u@|A{@`Be@|@y@zAu@vAGHy@pAeB|BkBzBWX_C`CiEpEkAlAeBfBKJg@j@mAnAYZe@f@[\\qAzAUZ[b@aArA_AxAy@tAs@rAeCdGs@rBYb@aAYWGq@I{@CaAAyAAE?C?i@AeAE]AOAGAGCECCECE?G?M?O?S?EBo@Ai@?K?_@?OAQCQMOWSMM[Yy@q@IEu@o@yAwAECWYc@]m@[uAs@GCIEICIAQAeAB]?a@@Q?Q?A?u@?Q?M?k@CMAUGKCEAWI]O_@MSIiAUcAGUAw@?k@@Y@eAHo@Fa@Fm@LaAXKDsCv@OFe@N]Ho@JcB^y@PaDt@m@L[JSHo@PI@i@JC@i@H{@NA?_@Nm@NQD}@NoAPqBTgBXiGt@mAN]?i@J[D[Du@Lg@HsCh@SBgB\\UFWFm@Lc@JI@yBf@GF?BAB?H?FANAL?Z?J?\\@NALAFAJCRELIVMZcA`BMZCNGTCJCNCNANANAHAPAP?D?v@?HCx@AX?ZA\\@h@@XGb@CLAHCVGTEJ_@bAIVKf@CV?TBVH^Rf@JRrA~BZl@H^F^@PFb@RlB@BDPLl@ZlAHf@DNBN",
  "MF1G": "k`nyMctgnAE?S?kC?sC?w@?A?k@?g@?[?y@@c@?M@UBC@eANc@F_Dh@e@FgBZoARa@HgG~@{AP]FQBqCl@c@LYFcAXaHnBSFgGzAoEhA_B`@q@No@Nm@Ps@Re@Jm@No@L]FM?U@a@BkAHi@Bk@Fs@DUBUBk@FE@K@SDIB[HC@_AXKDqBp@WJi@NYHYD]DQBA?]Da@DwANmCTq@@O@E?[C_BIoBMaCQ{BQaAKi@KE?s@IGAS?CAS@O@S@]HUBg@JA?o@Jq@Fu@Bm@?sAGgCOUEC?KCAAE?_@QEEUOGEAAIISMMGOEg@Im@Is@IWEW@]DaAJc@BO@C?S?q@Cc@Ae@CYCMAq@ECHBzBB`ADr@?D?LBT@\\BNB^@Z?BAB?DA@ABCBGDMFQPC@IFc@d@IHGRCFCHGXCZ?FADCn@AJA@CJe@jA[p@k@zACHOd@EJELWr@KXKVe@jAEHa@r@}@|Ak@hA[l@s@zAEFCFCFADAF?H?L?RBP@J?@DTBZDVHZPd@DLBHDLl@fAb@l@DFTXTVJJRRdAbAPRp@n@r@p@DD|@z@`Av@Z\\^`@j@j@BBb@^BDJJRPTLNLXRNN^Xb@`@PLr@f@NLDBTPHFPRHLDBJNNPFHHLf@z@BBRb@FJBHFJT`@JRRVR^h@v@`@n@LPRPBBDBB@NFf@P|@b@r@`@j@Zb@@\\?D?D@^CjAEb@Cj@?NAzAQLAVEPCPCl@Kt@KTCh@KDAPEZE\\GZGLA\\GRGn@Ib@GRC\\GJArAUNAd@ERE\\EREFABAPCPGNEFAZKjAa@d@O~@Wb@Kb@M@A`@KNEnAa@t@Ub@KXK^KRGLE|@_@PETGDAREDArB]b@G`@I`@G\\EVCh@Az@?V?dCKh@AJ?d@CX?`@Av@CNAGuAMoBEa@?CGeAWiD_@kGGaAOqBM_AEk@AKOiAIu@CWMcACQK{@QqAQsAg@aEKy@MoAQ{AOwACM?KSgBI}@EYY}Bc@uDAQCWEg@@A@A@C@E@C?G@ICMESK_@COAEAC?A?A@A@EDEDENShDs@bFmAvCq@dHiB\\MjD_A@?rBi@LE`AY@?b@MfAWHCtAYVE~B]`C_@nB[n@KlASfHkAfAQd@E@?VENA^?lD?v@?hGAL@TA",
  "MF1GA": "k`nyMctgnAE?S?kC?sC?w@?A?k@?g@?[?y@@c@?M@UBC@eANc@F_Dh@e@FgBZoARa@HgG~@{AP]FQBqCl@c@LYFcAXaHnBSFgGzAoEhA_B`@q@No@Nm@Ps@Re@Jm@No@L]FM?U@a@BkAHi@Bk@Fs@DUBUBk@FE@K@SDIB[HC@_AXKDqBp@WJi@NYHYD]DQBA?]Da@DwANmCTq@@O@E?[C_BIoBMaCQ{BQaAKi@KE?s@IGAS?CAS@O@S@]HUBg@JA?o@Jq@Fu@Bm@?sAGgCOUEC?KCAAE?_@QEEUOGEAAIISMMGOEg@Im@Is@IWEW@]DaAJc@BO@C?S?q@Cc@Ae@CYCMAq@ECHBzBB`ADr@?D?LBT@\\BNB^@Z?BAB?DA@ABCBGDMFQPC@IFc@d@IHGRCFCHGXCZ?FADCn@AJA@CJe@jA[p@k@zACHOd@EJELWr@KXKVe@jAEHa@r@}@|Ak@hA[l@s@zAEFCFCFADAF?H?L?RBP@J?@DTBZDVHZPd@DLBHDLl@fAb@l@DFTXTVJJRRdAbAPRp@n@r@p@DD|@z@`Av@Z\\^`@j@j@BBb@^BDJJRPTLNLXRNN^Xb@`@PLr@f@NLDBTPHFPRHLDBJNNPFHHLf@z@BBRb@FJBHFJT`@JRRVR^h@v@`@n@LPRPBBDBB@NFf@P|@b@r@`@j@Zb@@\\?D?D@^CjAEb@Cj@?NAzAQLAVEPCPCl@Kt@KTCh@KDAPEZE\\GZGLA\\GRGn@Ib@GRC\\GJArAUNAd@ERE\\EREFABAPCPGNEFAZKjAa@d@O~@Wb@Kb@M@A`@KNEnAa@t@Ub@KXK^KRGLE|@_@PETGDAREDArB]b@G`@I`@G\\EVCh@Az@?V?dCKh@AJ?d@CX?`@Av@CNAGuAMoBEa@?CGeAWiD_@kGGaAOqBM_AEk@AKOiAIu@CWMcACQK{@QqAQsAg@aEKy@MoAQ{AOwACM?KSgBI}@EYY}Bc@uDAQCWEg@@A@A@C@E@C?G@ICMESK_@COAEAC?A?A@A@EDEDENShDs@bFmAvCq@dHiB\\MjD_A@?rBi@LE`AY@?b@MfAWHCtAYVE~B]`C_@nB[n@KlASfHkAfAQd@E@?VENA^?lD?v@?hGAL@TA",
  "MF3": "kdryMqfinALh@BJDL@D\\jAN^Nb@LPLj@V~@BZ?H@R?TFt@B\\BHDP@@HNNTNRvAjBb@j@BBRVz@fA`@j@fA|Ah@t@n@bA\\j@Zr@Pd@JX?BJXNj@Rt@\\hAX~@n@zB`B|ENh@HZJ\\j@dBJXJZ`@~A@Dx@pCDNLAz@QhDs@bFmAvCq@dHiB\\MjD_A@?rBi@LE`AY@?b@MfAWHCrAYVE`C]`C_@nB[n@KlASfHkAfAQd@E@?VENA^?lD?v@?hGAL@TAzAAtAA|@@hCEj@EdAKlEa@JA\\ClARXH?@@?PFNJLFPNLNRVf@z@RXNTb@h@LLZTPJTJhCjA|@d@l@\\ZTf@f@JLPRvAbB|@fAX^@DLTNZLVP`@JVbAdCRb@Xt@JVLh@Lr@n@tFFd@FJHpAB`B@P?bA@j@HxK?L?Hb@ArBCh@?l@AzAETArDMnDSp@GB?`DMfDOVAPAx@E~FWbESVCXAnBMdCGjFOvAG~BSfAM\\E|@KjAItAInBO^C|DUdDUbAGPARAVAR@j@Dz@FD@F@B@B@@@@B@@@B@B?B?B?FuAlGYbAMf@W|@gA~Da@vAe@fBI\\w@xCQp@E^CLA@ETCFKVEJITq@hCMd@K^[tASd@K\\_@dAwAdEM^e@pAQXSXUVWNIBIDUDO@_@@W@WBaADgABg@@yDJG@IBIAYH_@HODgA^_A`@c@VUR[ZWXQZITABK\\G`@EVEf@Cd@BVD\\HXF^HRd@dA^t@Xr@Pb@LXh@~@HN`@r@LTb@v@JTFVJ`@FhA@JD|@Lt@Fj@D`@BPBTDVT~@DRd@~BDRl@~BJZDPBLn@pBHXBJDLl@|Bh@fBNv@BVBVTA^?j@CzCIb@ERGJAhAAbAErBEtBG|@At@GZAxAGh@AzAGxAKb@Ad@CtDOd@AbMe@r@Ch@C@?D?@AF?jBGfAEh@?h@Cf@AlAEP?p@Cb@APAf@CVA@?@?j@Ef@CJ?t@Ar@Cv@AH?j@?L?lAExAGRAN?T?T?T@TBP@hCZXBPBdAHb@BbAH@?dBNJ@bBPTBZBj@H\\FJ@",
  "MF4": "kdryMqfinALh@BJDL@D\\jAN^Nb@LPLj@V~@BZ?H@R?TFt@B\\BHDP@@HNNTNRvAjBb@j@BBRVz@fA`@j@fA|Ah@t@n@bA\\j@Zr@Pd@JX?BJXNj@Rt@\\hAX~@n@zB`B|ENh@HZJ\\j@dBJXJZ`@~A@Dx@pCDNH`@Rv@Fd@@F?@D\\D`@H~@Ht@LbANhAJ~@Ff@\\jD?@@FRpB?BDZNnAJz@@@Hv@Hj@ZjCp@`FT`CDT?BRdBD`@ZnDF`A@NDn@Hx@Fz@@NDfABXLbB@VBTFbA?BDl@J|A?D@XFz@RtBHz@D\\Ft@Jp@@LJn@F\\DRFd@d@bC^nBNj@j@lCd@rBj@hCP~@R|@Jb@J`@Lj@H\\TfAFVZxADZBp@?N?NBH@DDHDHb@fA~@|BJVFJPb@h@fA@BN\\\\r@`@`AFJVj@Th@Nb@J^Pn@Np@Dd@Lp@T`@NDLBP@VAp@@J?JAF?N?TA^An@GdASZEVEXCf@Az@?x@AB?T?N?^Ab@?L?P?v@?pA?J?t@A`@?^AJ?PAtB@hBCb@@bAAL?nBATAlDCt@?f@@\\BR@rAL`@DtCZP@bCTF@rAJnK~@`EXfCFnAB~ADp@@fCHlCHjCBpA@l@?`C@fF@dFB`@@r@@n@@`@?|@@j@Dl@AvD@xB@bB?xC@^@~A?bB?H?nB?T?H?P@v@?D?b@?NATCXEXAZAx@EpAClAE`@Ad@Ab@Cb@CzAGBAZ?T?RBJAhAAbAErBEtBG|@At@GZAxAGh@AzAGxAKb@Ad@CtDOd@AbMe@r@Ch@C@?D?@AF?jBGfAEh@?h@Cf@AlAEP?p@Cb@APAf@CVA@?@?j@Ef@CJ?t@Ar@Cv@AH?j@?L?lAExAGRAN?T?T?T@TBP@hCZXBPBdAHb@BbAH@?dBNJ@bBPTBZBj@H\\FJ@",
  "MF5": "_d{xMc}inA]z@e@dAy@vAq@nAaBnCmD~FIHA@ABCLE@E@EBy@P[JOHKJa@t@ABEJMXEDONOVMVEJGPCHITABAn@?`@?j@?T@RBh@?N@F@FPl@ZhAZhAXbAH\\J\\Lx@P~A@J@HF^BXFv@Dj@JlBH`BJxABb@NdBB`@@DF|@BRTjBFd@Fh@Fp@BPFd@NlADXD`@gBe@o@Q{@YeB_@UEaA[gAWm@OMEGPCRk@bEi@fEEV[jCCJYfCIh@]rCu@fEg@hDQhCANP?pDDlBBD?zDDlBBtCB`GFdCDGdCGdBCjBEjBC~AGfDIpDCnAAb@M|FEtBM`F?PKvCCrBBp@GvC?dAGhBCVA~AAz@An@WvK?`@AN?X?NAf@C~A@ZCp@CZ?FAHAHAPAR@r@AfA?d@A^?B@\\@D@RHx@Lt@Hn@Df@Dp@Dp@JxC@P?B@R?L?ZA\\EbAAHAf@?R?t@BfABzABjBB~BDf@@d@@DBP@DPb@x@lBR^BHP`@Xl@p@rAh@bAHN\\j@\\|@p@dBr@lBDl@En@Oh@a@r@}@z@u@n@y@n@_@ZMJMNMVA@IPEREPG^?NAP?J?R@L?D@F@FBNFLR`@FJTf@Zn@`@v@Zn@HLLVNVjAzBP\\p@nAHJb@z@@@x@~Av@zAj@bA`@v@bAnBfArBHPl@dAt@zAZl@r@nALPBDHHDHFDDFJJHHBDDDFDRN^ZJFFDHFFDPHFDHBFDHBFBHD\\LLDZHb@LD@XHTDd@Fb@Bv@@j@?p@Al@A`@ChA?|@@H?J?H?v@@|A@z@A~@@vA@jA?^?N@L?J@JBXD@?ZHXH\\JPFJBH@VH@?PFPFVJRHVJPHRJJDTLPJLFJHJHLHLHZXLHZVr@f@~@t@nCpBlA~@z@p@z@r@PLJHDDDDDDDDFFDFFHHJDHHLDFBFDFt@fBJXj@~Av@lC\\jAf@bBX`Ad@dBp@dC|@~CDJDLX~@d@|Af@xAf@dBFPeAXeEnAgA\\wBr@ODsIjC[H]LaInCiDdAyAb@q@Pe@LSDDXHLVPDB`C\\bCZJBtATRBzCd@TBvEn@rEn@v@L`@JVJv@\\bDfBdElBjC`Ae@`A[l@}@lBeAdBQ@SLQRMTYLEBSPYVUVMNGNIPCT?NARGLw@bBA@AB",
  "VMF6": "eqwxMq`zmAZk@\\i@`@m@hAeBT_@BGHQDOBUlBwDz@gBDKFMJWRc@tAgCp@oAVe@HQb@s@dAkBTQDETc@d@{@HQLUHOg@W}Bm@kA_@UIMEg@OWIQIMGIGQSAAECAAKMKSGOo@kByAeFGKES_BmFoCqJ_A_DSo@g@cBi@gBs@eCoBcFMSEIEKEGGIMSIIEECEEEGEa@[cBqAy@o@i@c@_HcFMKs@i@ECa@WYSWMECQIMGGCWMICOGQISIAAWIICGEGAICOEWGOEGAKCKCGAGAGAGAGAEAGAEAG?GAE?KAa@Ac@?g@?aA@a@?s@G{@Ao@@e@AG?k@?O?C?G?E?K?K?I?K?I?{A@wA@k@@i@Ak@?K?QAa@EQC[GUCWGAAMEQEu@Wq@]ECs@a@u@o@YYKK_@e@e@u@Yg@}@eBYg@Q]CCOY_AgBu@qAc@{@a@y@aAkBwAqCa@s@Wg@Yk@KQ{@cBa@u@OYOWIMmA_CAA[u@CGQa@Oa@CW?EAU@WBYFWBKBIHUJSVYb@a@|@u@p@i@f@e@XYDGNUJULe@Fc@@e@Gi@Qk@[y@Wq@KWKUa@y@qAaCe@{@a@}@iB{DCGSg@GQCSGqACiCA[Ci@?EGqB?e@Ao@AU@Q?O@[DsA@I?G?G?G@U?G@a@?EAIGi@?CEmAC_A?GMyA?GIs@Mu@E[CQAQCa@AU@G?E?c@BgA?O@c@@c@Be@DgA?GF[?aB?k@AO?I?C?A?A?A?A?C?A?E?IDkBNkID{B@qABq@DmAPyE?}ABkABuC@QHsD@o@JuFF}CBqAFcDL_HNqFBcADeAB_A@SBoB?A@a@?ABeA?E?qAFgCDkBDkBHoCByA@}@@O?S?W?Q?K?M@aA@MUIeAUoAWcBk@iBk@u@S",
  "MF7": "{o}xM{lhnAcDo@oFsBiEsB}CqAgH}CmPgIoCuAoGgDxE}LcDwAtQaf@|JmXoBsAqDmAaGwBuCq@eFgBTuPdA_FbHuCnUsGtFaBs@{AiB{BeAuAcCmDk@y@oAqEIq@{CeFcEkEcBmBqBeDaC_E_B]_JsFoHiCiDwB}D{A}CaAyDSeGkCuIsDcI{CeBi@cDYoAUMiIAyF",
  "MF8": "}{rxMshfnA_@JWiAUeAEQUs@M_@EQAO?W@SBe@BMFUH_@Rc@P]l@y@HIl@k@BCl@k@REJEFCVMh@_@XOHQ?C@A@A@G?CBE@Cz@cAJK|@cANQNSNQz@gA^g@x@cA|@oATe@h@w@@ARYTWFIf@q@d@o@rAeBAAo@s@o@w@o@u@UWWYa@c@EGKGMISKYMMGEAYIqBo@YIKCw@Ua@SuBuAi@]\\i@tAwBzAuB\\e@Za@d@k@PQRQhAk@|CmAp@SfCoA^QdBi@ZKRETCZEr@QdAIdACD?PHnDHdCD@Dn@bBN`@nAhDZ`AJLBFh@`C@@BVFZDZDt@B^@v@?RAN?D?DEn@Eh@Ej@aAPSB_@BQ@Y?O?c@AsDOk@AO?y@?}A@Q@E?C?ODUDIDQJo@f@s@h@i@j@h@p@~@jATZLJ^\\PTnA`B|ArBTZdArAkA`@q@ToA\\cAXeCx@{Bt@^tA@FBFb@dBBFPbAH`@wFhAiE|@k@LeCf@]Hs@Rq@Va@LiBp@RbC?L@RO`A_@|AcATgB^",
  "MF9": "y_iyMe}gnAECSKKEKEKAI?K?QBg@QYOk@Yg@W_A_@k@WAAUMc@WMGWSSs@AKE[Ai@?i@Fg@Pe@Xg@d@c@RGj@Q\\IlA[PE@?rCk@pCa@?CIQwEt@{Cr@i@NaAV[JKBmAVI@O@]@KAe@EqASKCkCe@SEYE{AqASQOU?C?AA?EGaAoAGIW_@CCMOW_@QWKUGMEQGYQk@GKEMGMIQE{@Cy@Ac@AO?[@QDMBOJUXk@DIR_@BEJYJSFSHQ@EDM@KBQ@YCaAEyBAe@AY@IBEDERGJED?L@H@Z@J?T@V?RCRCREJEHCFAPIXMl@WDAn@Yb@Q|As@HEBCBC@C@E?C@C@MDoDDw@@i@DqA@KBO@CDGFEBAHCNAl@GtAMd@Cb@EZC@?xAQTILGDC@A@E@K?KCKQg@Qm@EKAGAIAKAQ?O?y@Cw@DYHmA~AHf@DR@z@Df@BT?|@Bx@@X@\\?x@?|CDv@?H?p@?^@X?L?vABv@C`@E|@AbBD\\@VA^Cp@KbAQZG^Ef@K`@IrAYDCj@Kr@Kd@I`@I`@KHCj@Id@Gn@A^AF?ZCL?PCBADCHGV_@@CFGDARKZIRCFC@A^Of@OLGRGRGDC`@Gl@I@?bASp@Q@?p@ONIB?`@OPCDA^KVOTQTU\\S`@Sx@SNGf@KZOTMLGLIFCt@_@p@e@TIh@YJCZKRGl@KJCVMTFH@ZBj@B",
  "MF12": "g`gxMqidnAbCfJfBtFjChIrBrFzAbEt@bClBvFhAbD\\~@HtAIhA[lAsC~HsA|E_@rBi@lDe@x@qBnCyCvBgAt@wEf@}Hp@eHZkANOp@rA~@zBlAlDzB|Ap@lDz@jBjAbBnAnBtCvHvErNlDbOrElBdAKtA_@dA{EpIsFdL{HfOqCrFg@fCo@r@{t@`b@}QpOoOtLcS|HkYnHsD`@cJrBgOtByAnE}AdBsDxA}CpFi@vA{HvVqFr@_IsGqBw@yB[gAiCuDs@}A@_FOmBu@DaC",
  "MF13": "y~fxMijdnAs@iC_@qAGQIYIOMY[c@KOo@o@i@e@YMOISECAuBa@MCgAO_H}@kBWgAOB[VwBQkCg@uHG_AIaAGu@Ew@KgAdBOb@EFAZEd@Ix@Q`@Gn@SnA]bD_ARGx@WzBu@\\KnBo@LEF@n@MrBo@f@SRGSo@Yy@GUW_AIYCMCIAMAOEu@ASE]?Q?G?IBSDQBOLk@HWFY@O@I?IAIEo@Ay@Co@AYS}DAUOaFGuAG{@Iy@Im@|AMJAjBQ|CWnBGv@Er@MVMh@UvCiAhAYoAiA_@e@IKKQIQISM[AO@G@G?GAIUkCKcAAMMcAM}AK?PgAN{@Ny@?E?M?M?IAICKGo@M}@G}@K{@Q_AdDe@zAYNC|Cm@^Ih@MzCo@VEl@KnAUnAUj@M^IfEu@@?t@M`AOhB[Fr@J|@Jr@Lz@@r@Jv@Pz@RfA",
  "MF14": "cqaxMqhwmAuQa@PkMn@kBLuAKaFkC}AqBcBK{Be@kS^{DLoGHeGH_FiAwHs@wAuA{DS}@CaD\\yBTkA{@cPG}@f@}C^sIwC_LoByEeEgHmCoEmDuCeAsG",
  "MF15": "c_oxM}etmA}BAkGKO?wC@aA?sACIADaCB_C?OBiC@m@?G@_@@aA?]?E?EACCOAGCQA_ACeA?O?ODiABgADeA@s@BYD{@@QA[?O?O?KAg@?OCm@Cm@?O?aA?KEs@E{@Ks@Iw@GYAEM[MOUWg@w@W]IOAAAEACAC?E?G?E@E?CBEDEBADCBAFADAD?x@ENABABAFCBABCBC@EBE?E@E@]@a@Bk@b@oFH_A?KJiB?SAOAKCICECEGEIEy@SeAO[KMEIESMOQKMKQMUKYCCGG[So@k@gAi@QK_@_@IMMQKUe@w@IIGOQ]]w@[y@CGAG?GAqAAcA_A?mA@?yCAg@?e@?y@?S?i@@eEAm@@o@?g@DaFA{A~BA~AGt@?bAAvAAT?jDCRAzAAb@Ar@Cl@C~FUbEU`CMZAF?nAEjAAB?F?bACF?TAX?D?j@AD?d@AF?L?n@?D?`@EDAREd@Ij@E~@CJCF?f@ERCn@GHAp@MBAzAG\\?T@\\DL@?TAjAAv@C`BCxCGlBAt@CPCb@O~AGb@",
  "MF17": "ckoxM}h|mAG{TyUJFpYhAdD?dC{@~DClAPx\\JnWoLf@H|g@OtYBtCtC?N`DvE|I`CxA~@xA~EtA^f@GbGo@tDF|CaC^s@j@xA|B`AxAb@hDVzEc@pPO`QGxKo@`I}BjHsDvN}AhIf@~NFlBg@vOdAtDlArHVbF|DG|@V^tRtAVtBrHtDf@pLsElAo@lCyI|CeBcBs\\",
  "MF18": "utqxMyhanA^rAPr@Pj@f@xANl@jB|G\\bBA@?@A??@A@?@?@?@?@?@?@?@?@@@?@?@@??@@?@@@@@??@@?@?@@@?D?BAB?DC@CBC@E~@UtCw@^G|HoBTEdA[DCHCLEJGJGFENMPOPMn@g@x@s@|@w@XG\\EVEt@]`@GhDVLHLVBF@DNb@XbADRLZZz@Vj@LZ@BPh@Ll@LZb@x@^fAL\\Rn@j@~AFT\\bAJX@BDJHHHHLHTJ`@PjBd@\\JRHNFVPb@XTVPTHFHL?RX?J?X?xBBlBBhA@lB@jA@tA@P?zAAXArCCZJzA?b@?nB@bA?V?Ae@?EAcADcH@{@@y@ByD@sB?c@?c@AkB?[@eA@gA@s@CwB@a@BSDeJGs@?QIWY{@_@kAs@mC]_AUu@U{@Sw@Me@Kk@GQI]EMAGCKUs@g@cAIM]m@W_@_@e@e@c@SWaAoBWs@M_@k@cBM_@EIEQACAEAAAIGUwBSW@K?q@@wAD}BN}BVqCLoA@eADoAFs@DmADO?{ADi@@gBFYBu@@e@DI@GBSDK@K@O@OC_@Ag@Eg@EUGSKmAmAq@s@wBcCk@y@Ae@G[EQ]_@_@c@_@i@MSEGCQGe@COTkBEOCKIOkCJ]C[CC@EBC@EBCBC@CBCBCBCBADCBCHEHKd@MTc@vAYr@INiAvBIZCJAHAHALF^Jr@Pz@F\\H`A@LHv@@BF^H|@_AbACHKLOHo@LWHYBe@FQ@Q?S@a@@S?U@e@B}@JgAJ]?YBkANk@FM@MBi@Be@BM@S?Q@S?U?U?WAUAOAOCQCGAC?UEC\\@L?J@FBJTt@`@pALd@Tv@Pn@Jb@p@|BRp@FTDFFNdArDXlAVd@Z~ARn@r@fCXfABNLh@Nb@^pA",
  "MF18A": "{sqxMohanA[gAKc@K]AEGQIW?KOg@K_@aBeGEOQ_@GMMe@Ia@[eAu@eC?G?EAG[uAdAW`@Ku@gCi@iBo@gCCIR?R@R?TAj@At@Gp@Ih@Iz@Ot@In@KD?r@In@Eh@Cd@CP?L?NAX@P@N@LBLBL@JBLDPJTLj@ZZ\\dA~@b@^dAbAX`@?@LN`@EdBOJ?tDSzAIlBKl@ChCMb@ChAGGQeAeC{@sBEKMe@Ke@AK?IHi@Pc@vAFj@FXF\\F|@Nn@HpBFn@@\\@dACbAIt@E\\LNBN?@?t@CxAGpBIlACb@AhAAv@EJAD?LALCLC|@StA]XIBFHT@D@H?TGh@[|AKz@M`AKxA?TAr@Br@@xAB|@Ad@At@A^?b@FtBAj@D`ABb@Hz@HdABL@LBl@B`@BX@HFtAD`@DR`Di@PCREPCd@KnAWzAY`Ca@NCfASj@K^EERCHAH?NAxA?F@nAAz@?B@lB?@AhB@`AAj@GbD@P@fA?fA@B?jC?J@rD@vB?P@fA@b@?b@@fA?|BS?yA@W?qBC]AS?YHQDc@?sACm@AC?{A?Q?eCCc@?}EEsD?k@?A]?I@G?y@?]AmA?O?o@?aD@wGCcA@s@AyB?I?MA]AiB?s@CmAAuAAQCMOQQM{@}@oBqBIIeAuAc@o@eByCgBnAaAdAgBrBGDg@ZkBl@c@HmAXm@POBm@PaAVL|@VxA\\hBEDKLKJg@d@_Ax@y@n@o@f@QNA@OJONGBKFKFMFIBkA\\UFA?wItByBj@a@HUFKB[D?AA??AA??AA?AAA??AA?A?A?AAGs@kAyDu@sCSm@i@iBYcASs@",
  "MF19": "gzqxMyjzmAP~@FLJt@DnCHtFEVCRz@?r@AjACLAzBHzCGpCGNAd@?dAAhAAhA?hAA~DIxA?fBCL?jBA~FAn@?PAr@?xGAD?dCAn@?fC?P?@U?Y?gB?_A?mA?M?w@@cA?A@mCBkB?C@c@@gB?G@[@}AC}DAkBAI?A?E?A?M[?sAByA@_CA}A@wA@cEHQ@yABuB?sBBaB?OA?NBvCgABcD?{A?_BDE_D?Q_B@gA@uA?c@@O?iBD{AB_AB]AsA@iA?iA?mA?G?sCBQ?@L?bA@z@@x@@r@A`ABjA?bA?`@HN?T^?V`@JPJPDLJh@Nn@~A?l@?",
  "MF21": "adnxM}yymADNH`@Dt@BP@@BFPPCbABfA?JFdABZHzBHv@@LN`AJl@^hBRbAPnAF~@@fAOAWEUAG?W?{AFC@q@JI?aALo@JI@C?k@DE@S@E?U@A?E?A@{@JG@_@DC@g@@Y?Q?Y?E?y@?G?s@@I@o@?E?}CLG?_@Ba@@c@BaADoAFmBJqFNmBJk@@sGHsD@iA@kBDqABI?M@wB@aB@uDCuABsADC?o@@uFRcA@}@Aq@?wA@oDHiAF}@Bo@@w@D}@@I?m@AeBGqBIMAoBGE?eAE_FOyDKkBKc@AwACmBEALAF?JCb@CXWnFQ@UHEPGz@Kr@AJCVCTCTETQt@GTCFABe@x@aDpEiAAq@AeAA_EAe@ABb@wAFaELe@?_@Be@BU@y@@}@C}@CeAEq@AeAGm@I_@GUEMAM?Q?m@LYFm@Vy@b@ODOFMDSDMBoALa@B_BJy@FmAJuBP]BI?CACAEACCACAEOo@Yw@Us@W{@Uk@c@wAOg@Qo@Su@Qm@Me@a@mAUs@Oc@EQCGGUQm@]w@ISK]GMGQACAI?I?G?YKcBAGAMAQUcA?A[cBI]Eg@CYKqCI_DIkBKyCQoE",
  "MF23": "wvcxMsqqnAxL{GbK{IpPcEjOsDvL_FhIqByC}JpAsMk@sHK{Hn@kHv@oOlBkTGkEbTm`@uAi[|CwMiIqKnOaRhByBoEkHc@SmIhAmBf@kEpDaAV_PcEeKFiI^qQxAyB~@o@r@eFn@qCK}Jr@uAr@gk@vj@cOzO_AxK?xI?xI}BhJuCvOsClIgBpKlBb@jG^pCvElDhC`CdBdBx@xCpAzEx@~EzDpCdBbE`BhApCf@`C|BfFpBdD|FdKJb@qXbEdOl^xIyC",
  "MF23B": "uwjxMy~rnA@?HTA@A@?@A??@?@?@A@?@?@@@?@?@@@?@@??@B@BBD?B?D?@A@??A@?@A@A?A@??A?A?A@??A?A?A?AA??A?AAAv@mA@CLWbBgDdAiB~@oBf@{@f@s@l@eAnAwBfBkCTWXYDCrCcD^m@Vc@d@w@`A{AdBkCHQb@]XUh@c@\\UjEwC\\UhA_AJIxAqAr@k@pAkAhA}@p@s@JGFGDE~AzAnDjDJHb@`@PNXJJFPFXBR@`@?zFEn@@X?P?`ADv@FhAND@VBh@Fh@FRB|@LVDdD\\fAL`AFf@?lGc@lHk@D?vAKl@EhCGAYLg@Pq@lADjBFt@BJ?HAF?BA@A@A@C@CBKJo@VqAd@kCReADQFU`@gAFQDONi@?AL_@J_@J[X{@t@uC@_@@ODKJc@Lc@FQBIBKDOVqABMDW@I@M@MHc@BQBSLkABUZkBNw@DGH]@G?C@C?I?y@?OAm@DMCi@?WAWAa@@k@@S@WBK@MDMFa@@G@MAu@AKImAAMAm@?Y@W@KF_@V{AJQHcAHcACSPSd@g@F}@Da@Jg@B[D_@Bg@@OBsABw@?MlAM|Fm@\\Ch@CRCf@E`AM`@GVGbAI|@GHCHADAFCFCJGLGNKZUDCDEDEDCFCFAFEHEBA`@QdAYr@Mv@Od@MRE|@OhAQx@KTGpBc@VE\\Ir@SdAUTGrD{@XGHAJ?L?J?L?`@@D?@?HADAFAlA[VIv@Ql@OvBk@f@Q@?^M`@Ud@]n@g@HMBG@C@C@E@IGi@SgBKy@?AM}@Ga@Ca@AOAWAO?G?i@?M?_@?a@@_@BUBMDMDMLSDIHMRW\\_@\\]LKLOHMn@_@LEdAm@`@Wt@O`@GNAd@ETAHA^Ef@EHABA^GXGVCTA\\?P?\\@L?X?^Al@Cv@IB?D?n@CbACJ?b@A^A|@Ej@CJAp@EnAKdCMp@?R@H?F@F@PDRFrHpCXB`@Dr@DhBN`A_@LId@[h@a@^Wp@e@LIb@S`@QRGh@Md@ITEd@IrBYTABAHAPAN?TFVDHFRLTb@HLHFFBHJV^h@x@V^FJBBl@j@PNAD?B?BGJIJGFKLeA~@{@t@]\\KJIHSR]ZQR[Zo@|@cA~Aa@d@STONOLIHEBUT}ApACBCB?BAB?F@F@JNV@BRVHJ^f@JLRXV\\TZV^`@h@RXJLDFFHLRHPDHBJBHBJ@HBH?PAH?F?BCHAHG\\GTKb@ELIVELO`@Qb@ADIR]x@GRGPCLCHAHAFAH?D?JANBPF`ADz@d@tFHn@Dp@Hv@B^Hl@Fr@F`@Ft@D\\@t@?HAD?BABEJc@r@a@v@g@x@ETcC`Ea@v@U^[n@GLa@r@eAnBC@C@C@AB_AfBo@nAYf@ILOXy@hBM\\?JANARC`@AT?TCXCb@EfBE~AC`BI|@AXE`AGt@Ip@SrAE`@I\\EZ?@G^CVCNEr@?DA\\G|AIfA?@C\\Cj@ADAZEl@ItAGt@Gr@G|@Cd@?Z@r@?VBjAD|BDdA@PFbAJ|A@V?P?RARCVCRERCNGVMx@Mz@I|@G^GXAd@@R@P@FDXFRRp@^fALb@HVNf@?BFPPp@BHs@N_@Fy@PA?m@NSF_@Jk@Rg@Tm@Vc@R_@PE@iAf@yAl@kA`@iAd@k@R{@VE@u@TaB^eCj@[Hc@JcATc@J}Bh@AIm@LeAV]HSDc@JUHmAd@OFOH_@P_@T]TA@YT]Xs@p@a@^e@b@SNSPYVGDWRk@b@MH_Ab@y@\\IDA@_@PMF",
  "MF23E": "wpcxM{vqnAw@\\kAf@uD~AOFcCfAR^~As@`Bu@~E{B`CeAr@[rAq@RMv@i@^[LKXW@?r@q@b@a@dA}@f@a@b@[ZONIPI^Qb@OJENEj@Qj@Mp@QvA[x@Sb@K`@KdAUTGrA[bAWZGpA[t@SdAWHEXIh@SlAe@lBy@bCeAb@SZMh@Ur@Wb@OFCb@M^MLCTG`@IBAt@On@MREKa@AIM_@IYUw@Qk@Ma@Ma@[eACMEQAO?O?O?CCS?O?GBMXuBH{@Ns@DWBMHu@@Y?SAc@KqBEq@?MA_@CaBAq@ASAw@C}@?s@?K?M@[FaAVuDBa@Bc@?CFiA?EHgABs@Bi@BY@k@@MBQBYF]J{@Fa@T}AJaBPyCL}DHiBDaB?IB_@Bi@L_@@GBIN_@\\s@bBaDbAkB?A?A@A?AACdAoB`@s@FMZo@T_@`@w@bCaEPOjAuBf@}@BI?A?C@CAG?w@E_@Gu@Ea@Gu@Im@C_@Ec@Ea@KqAw@oJ?Q@a@@I@G@IFWFQFSj@uAZw@DMPg@DMJc@FULq@@S@[EUCIIUEKIOOS[_@U[a@g@_BqBKM]g@IKSS]UAKAG?G@C?CBCBC|AqATUDCHINMNORU`@e@bA_Bn@}@Z[PS\\[RSHIJK\\]z@u@dA_AJMFGHKFK?C?C@EQOm@k@CCGKW_@i@y@W_@IKAI_@y@SQSIB]@]JeAGWEKEGGEYMMGa@KYKIGKICCQWKQEGMWc@}@CCIQ_@u@GQYi@O_@ACg@wA?AEK]eAScACQWyAAGGUOw@Qo@KQGEIEICWAIA_@CQAKEKESMMKSIiAc@ME[MGECA?ACGCIC[?ACU?U?MCKEEEGWS_Ak@gC{A{@g@_Ai@KGMIg@a@e@Yi@M_@GKAa@G}@Ia@CQ?mAKs@Gy@GIAk@GqAIeBEU?_@Bg@CQCUGWKECUMQOWSi@g@[WQC]Aa@EkACy@KsAQIAoASc@GGC]GyA[GCECCCAE?G?I@KD]D_@@U@S?IAE?AACAAECECMEOCs@IsDa@cBSqAOcBSE?}AQeBO[EC?sAQq@Gs@I[CQA}@IaBSIAcCSUCM?a@Gq@IMAOCA?]CQAG?g@?k@?M?A?m@@aBDg@@W?a@?E?U@_@@A?K?]?A?OASAOA?AOC_@IMEOCEA[IGEGEEGEEMOCEQ[IOuCz@gCt@c@JEBi@LE@y@RUDUDWDWDi@Ds@Hc@Du@Fc@De@DwAPSBmBRyBN]BI@c@DM?Q@CJGTGPEFA@IJIHMFm@NMD_ALQBi@Hg@BUBC?uBVc@FiBTOB_@DeBRe@Fq@HoAROBA?m@FYB_AJwAPaCX{APo@HYFkDl@g@FWFw@J{@LE@a@FG?G@cC\\s@Jc@HK@w@LUBOBiAPUDQDKDSFgAh@_@PULKHIFa@Xc@^INCDOBcAnA}ApBkAzAIJaAtAi@|@KNINABABCHAD?B?D?DBHHZPh@BNBN@PANGVENGTOd@ADAL@^?X?LJ`AJ|@?DH^Hn@Fj@D\\BNRtAFd@ATAAA?A?A?A?A?A@A??@A?A@?@A??@?@A??@?@?@?@@??@?@@@@@@@@??@@?@?@?@?@?@?@?BD@@BJBH@NFb@",
  "MF24": "iqcxMewqnAkBz@c@PkBx@eAd@A?KDqB`A_@P]PSJBFP`@RK`Ac@BFjBy@FE`Ac@~@a@bEmB`EiBL?N@F@FBJD@@Dv@BX@X?F?J?J@h@?f@?x@?j@EhAGlA?D?RAl@?pA@LDbA@J@BBV`@fBDd@DPb@hE@hA?j@?RC`@CFId@e@`BQr@M\\YbAs@hCUv@e@nASp@ERITc@tAGNw@bCOd@]nAY`A[`AGPM^]jAe@|AAHYfA?BENg@xASr@g@bBOl@O^S`@Ub@GFEFMLQLUJcB~@sAr@i@Vg@Vg@PDJn@r@n@n@VVZZpAhA~AvAt@l@n@d@ZXZZd@\\XXJLFNb@pA@BTt@X|@Vt@KJCHAHADATCr@?HAp@A|@CpA?bA?V?VAj@CtAGn@AFQrAWrAKj@G\\Ib@Ml@S`AIl@AHu@nC_@PEBSRCDAB[b@EDCDIFGDSXMPEHGNGX?@AX@XDjAEHqATu@Lw@BcAH_@@K@O?Q@I?i@@G?I?G@QByAVo@J",
  "MF25": "ofaxMqzrnA`@Ib@IPCRELCv@On@MBAz@Qt@Oh@Kp@Kd@Kt@On@Mp@OLENC@AbAW|Cu@NEhAY@Ap@Qf@Kf@Ol@OBAjBc@ZKpA[j@O`@K`@K\\KJC\\Gh@MTEZI`@Kf@KBAf@Kn@OPEfAW`@K`@KfBe@bAWZI\\IDChA[TGb@Kf@K^Gh@Gz@Kn@Ij@G`@E\\I~@UNEb@QXKf@SJEdAa@BAn@WdBq@XMBJBHBPJ|E@fA@p@Bp@@H@HPt@ZpA`AvDDNPp@H`@V`Af@tBNn@J\\Rx@\\pAJ`@j@jBLX?BVl@Tn@Vp@BJbA~Br@xANn@Vr@Tj@@B@B@?@@@?@ADAl@UbEaBDJJETKd@QLCXGVGd@In@ITG@?^I@?nDcAJ`@DRF`@F`@@FLz@DTLp@`@tCDRDNDJP^HP@F@B@B@B@F@FD~@Dl@LlABTHXH`@FXDX@D@HBR?P@T@ZBn@?VLlC@R?LQ?{@BA?I@@pA@d@Bh@Fv@Df@JpA?@?Z@@@JBJDV@DDNHTHT@FXdAV~@BP@H@NTdE@\\JtC@VHvB@b@Bb@DBH@HBJ@R@D?T?d@CB?TA@?@AZ?JATAR@\\@J?v@?D?z@DJ@HBHDDDBDHLFNPf@`@lAFLBDPXp@x@^l@LTR`@LZ@D@@R^FPBFLb@BLJ^H\\FRFVL\\B@DDBB",
  "MF26": "amcxMowqnAnAk@L?N@F@FBJD@@Dv@BX@X?F?J?J@h@?f@?x@?j@EhAGlA?D?RAl@?pA@LDbA@J@BBV`@fBDd@DPb@hE@hA?j@?RC`@CFId@e@`BQr@M\\YbAs@hCUv@e@nASp@ERITc@tAGNw@bCOd@]nAY`A[`AGPM^]jAe@|AAHYfA?BENg@xASr@g@bBOl@O^S`@Ub@GFEFMLQLUJcB~@sAr@i@Vg@Vg@PDJn@r@n@n@VVZZpAhA~AvAt@l@n@d@ZXZZd@\\XXJLFNb@pA@BTt@X|@Vt@KJCHAHADATCr@?HAp@A|@CpA?bA?V?VAj@CtAGn@AFQrAWrAKj@G\\Ib@Ml@S`AIl@AHu@nC_@PEBSRCDAB[b@EDCDIFGDSXMPEHGNGX?@AX@XDjAEHLfBCt@?H?F?F@^Hj@Fn@Fh@?DDb@@X@HH`ABNBf@BLJl@BHJh@DRFh@@F?X?LQ|@?t@Cz@?d@@v@@RBhAHnBJt@Jr@Nx@Dp@F`B_AJA@UB]H[Fa@FQDm@Ju@L}@Py@Lk@JKB{@LqAT[Fa@LG@uBp@Yu@Yw@?AWq@[}@AAIUO[Sg@SF[aAUy@WoAIg@Gk@C}@?GA}@?_@?c@?c@?c@@gA?c@?_A?k@?c@?M?}AAi@Ee@Ca@E]EYc@wBCMCMY{@Wk@Yg@IMQYe@k@c@g@_C{B_@c@q@w@Yc@g@{@i@{@_@k@KS_@o@IOUe@KSk@mAYu@a@mAAEc@}Ao@}BeAqFmAmGESIk@Gi@]wCE_@MgAOkBGo@Gc@CWKm@GWUcACISw@]aAGUo@cB_A_B{B_Fw@aBiAaCKU_AmBmAeCcC}E\\IhAi@dDwApAk@PI|BiArCuAXMDC?AEKSw@yBkGWk@fD_BbBy@hBcANKd@Y@?zAw@h@[TKNKz@_@v@WhA_@NG|Ba@n@Kv@KNCpAQ^Gh@G\\GfAOrAUVIhA_@n@Wd@Ud@ShAi@pAk@`Ae@dAe@NI~CwAdAg@r@_@f@Ux@_@f@WjBy@FE`Ac@~@a@bEmBrAm@",
  "MF27": "kqcxMcwqnAiBx@c@PkBx@eAd@A?KDqB`A_@P]PSJBFP`@RK`Ac@~As@`Bu@~E{B`CeAr@[rAq@RMv@i@^[LKXW@?r@q@b@a@dA}@f@a@b@[ZONIPI^Qb@OJENEj@Qj@Mp@QvA[x@Sb@K`@KdAUTGrA[bAWZGpA[t@SdAWHEXIh@SlAe@lBy@bCeAb@SZMh@Ur@Wb@OFCb@M^MLCTG`@IBAt@On@MREKa@AIM_@IYUw@Qk@Ma@Ma@[eACMEQAO?O?O?CCS?O?GBMXuBH{@Ns@DWBMHu@@Y?SAc@KqBEq@?MA_@CaBAq@ASAw@C}@?s@?K?M@[FaAVuDBa@Bc@?CFiA?EHgABs@Bi@BY@k@@MBQBYF]J{@Fa@T}AJaBPyCL}DHiBDaB?IB_@Bi@L_@@GBIN_@\\s@bBaDbAkB?A?A@A?AACdAoB`@s@FMZo@T_@`@w@bCaEPOjAuBf@}@BI?A?C@CAG?w@E_@Gu@Ea@Gu@Im@C_@Ec@Ea@KqAw@oJ?Q@a@@I@G@IFWFQFSj@uAZw@DMPg@DMJc@FULq@@S@[LQFIj@i@r@s@@CNMBCDEFG@EDEHINWHQ`AgBX]LMHGHG|@a@`Cy@n@CXEv@Ij@IB?fAI|@CXCpAM\\CNCDCBA@A@C@A?ADQLg@Py@Li@DONi@Pk@@ANy@BKDY|@iDFWBMf@oBFKVq@Nk@@GRu@Ne@BMH_@@ETw@H]FY@Aj@_CNo@BKPs@FWl@}AJADAREnAKD?xAIZAz@Ap@?B?b@@H@@?nAIpAMB?RENCHEFEJILMRUPMTMPKh@UZIJAHAb@A@?B?^ARAdBArBEtAEx@CX?^Av@?R@~@@rADb@BrBFpA@v@JVFf@LTHj@JhARr@N@@z@LB@x@PD@VFD?|CK~@Gz@GnDShCKfAGn@C|AEfBBV?^?vAIXC`@Ct@IhAMd@IHAf@KpAWn@Kv@Mp@KhAONCrAONA@@D@B@BDBDDJ\\xAHx@N`ALdABXD`@D|@?b@lBCL?x@?P?l@@x@@H?n@@NANAn@IfAOTC`AOb@E^INGHELKPOTOJILIPIFCXKZKbCiANENGPGBATGREXETEXC@?n@CXAT?L?\\@h@?zAIzASb@CRAZA`BEX?^Af@AFADAHEDCDEBEBI@KBSBW@QHFNDRFd@LJBTHVNJLJRHPFHBD`@\\p@j@RNDB`@b@^\\LJDFRPNNn@j@VPB@LHDBD@DA\\CZ?R?@?RDJDn@d@@@hAp@RL@?d@Zl@`@~@r@NLjBvA@?x@b@LHHJFH@NBJD\\B`@Bh@@HDV@NDPBTHVJb@@DHTf@dBBHHZXbARt@?@TjAFZHNPh@HVBT?@?\\CTE\\EZEl@CX?N?X?BBNBPLn@Jh@Ff@FfA?HBZ@N@NFRHJNNRX@@BR@j@Dv@@^@XDVDV@HBN?@F^?BF^FR@HDL^fADNRb@@DT\\@BP`@BDd@pAJ`@Lb@f@fBN`@Xt@Pd@@@bApBDJrAvCP\\tAdCHLJVHNp@|A@@b@`ABF",
  "MF28": "wokxMglznAVo@v@zE@BhAlGZnB`@pC@LX~Az@rE?D@BXtATtA@FdAfE?@p@zC`@nA~@tCf@tAXh@HRb@nAvArDTx@DHZv@j@|A`@dAP^n@fBb@hAd@~@nAvCb@lAd@fALZPj@Vh@?BTp@Xt@@DZbABFVr@V^t@QF?F?@?D?F?B@B@BB@BBFFNPt@Hp@@DR`ARx@Nj@Nt@JVHTHXNf@DP@B?J?TDRNt@@D@P?B@L?J?BBXARE|@A~@Dj@PfAHh@@DLl@\\lAR~@`@fA_@t@ET?D?@?BAL@b@?L@X@^Dv@Dl@?LFhAFdAAb@@XBZ@NXvCB`@Bd@F`BBb@HlBFbAHjBDfAFrAIPeBjCaAzAe@v@Wb@_@l@sCbDEBYXUVgBjCoAvBm@dAg@r@g@z@_AnBeAhBcBfDUPCB{@hAA?A?A?A?A?A?A@A??@A?A@A@?@A??@?@?@A@?@?@@@?@?@@@?@@??@B@BBD?B?D?@A@??A@?@A@A?A@??A?A?A@??A?A?A?AA??A?AAAv@mA@CLWbBgDdAiB~@oBf@{@f@s@l@eAnAwBfBkCTWZDHBF@F@FBRHj@\\jEdDp@f@ZN`@J^Dj@Bt@?f@@pACX?`@AfBCdHQpDItFKl@Ex@I?@@@?@@??@@??@@?@@@??@@?@?@?@@@?@?@?@A@?@?@A@??A@?@A@A@A?A@??A?A?A@A?ArJENzBBh@Dz@BXFh@b@bAJLT`@f@~@z@vAV`@fB~CJPf@z@V^`BpBHJJFVNp@`@XTPPZ\\FFBHBH@H?N?REt@CH]tAALA^@ZFXRt@\\`AHV@Zf@rAj@dBPf@dAfDb@rAX|@LTJRHFHLDBVNXJTJpB~@l@VvD`B^Rd@VFFDHDDDJBRjAvEp@vDzA|FVh@GPCLEJEFC@MJOHOJIFED?@A@CF?@?Xa@R_@Pe@Xm@n@}@h@{Ap@_Bv@_@PoCpAOHPZLIZKzBeALGnB_A`Ae@hB}@pBcA~@g@LCFANGh@WdBy@v@_@z@a@xEeCn@]f@YjAm@VK^QPGNGn@St@SNEpASXGbAQ@?hB[z@Mp@Ip@Il@KZE`@KREbAWt@Y`@Ob@SFEfD_B|FiCz@a@|As@@?dBy@RK`Ac@BFjBy@FE`Ac@~@a@bEmB`EiBL?N@F@FBJD@@Dv@BX@X?F?J?J@h@?f@?x@?j@EhAGlA?D?RAl@?pA@LDbA@J@BBV`@fBDd@DPb@hE@hA?j@?RC`@CFId@e@`BQr@M\\YbAs@hCUv@e@nASp@ERITc@tAGNw@bCOd@]nAY`A[`AGPM^]jAe@|AAHYfA?BENg@xASr@g@bBOl@O^S`@Ub@GFEFMLQLUJcB~@sAr@i@Vg@Vg@PDJn@r@n@n@VVZZpAhA~AvAt@l@n@d@ZXZZd@\\XXJLFNb@pA@BTt@X|@Vt@KJCHAHADATCr@?HAp@A|@CpA?bA?V?VAj@CtAGn@AFQrAWrAKj@G\\Ib@Ml@S`AIl@AHu@nC_@PEBSRCDAB[b@EDCDIFGDSXMPEHGNGX?@AX@XDjAEHqATu@Lw@BcAH_@@K@O?Q@I?i@@G?I?G@QByAVUD",
  "MF34": "_fgxMi}pmAeFgHuEuEKe@fKoAvLwAlJiD`J}@~NCxHV`Cy@dBaAhD_AlCxB`B~@|B`CpBZxK{@dIaChBo@hAyAtQcEpImCzGmAfGc@pIWhIKfERjEs@vDeBxHsHhI_HbFcFdI{GtB}AzEeAtZsMjHuCtJuBnGqAtBuAvDeDzGeCaDy[FeAj@iAaDwGKyAOaC^kEb@}ByAkOeBiBNmBqBmKzFaBtA}B`AmHnFuJtAiCgHqF",
  "MF36": "iqexMc`omAtA|Cl@nANXf@~@FHHPJRJRpA`CLNJRXf@JNTf@Vd@HLFJ\\d@RX?@b@n@p@v@XVRPHJRRHFNN~C~CVTzErEr@r@HHxAtAXZPHJJJJNP@@HJzAzB\\d@FPHVJf@Hh@BNDXBVBb@Dv@DfARjE@p@@RD\\BTDTHTJTFNRGHAR?b@?D?HAJAHADCNELINIJKNQ^i@FKFEHGDEHEDCFAZK^IXIZKLCLCLAD?H?`@?B?X?f@?f@BP@J@JBLBJDPFVLb@Lz@TB@LDPFPHNJTNTPPLFDNLRLLJDBFDHDXJRFTFTDXDXDr@FZDJBJBLDB@BBDDFL@@BJBJBd@H|@BVBLBPDPFPJVR\\BFd@j@\\b@BDV`@BDHRHVFVDJVz@DHLPNPNNl@r@XXHHNNRN\\VJJHHBDBFR^Vf@JP^n@NVLRFHFHFDB@B@@@B?F@H?NANCx@KTCRAR?J?x@J\\DH@J@N?V?TANANATC^GHCb@I|Ag@FALELELCJAHA`AEBAb@Ap@EFA~AKh@CJA@?HAPCLALEd@MDAXMb@OZKPE@A\\IXGVEVCRCDAXC`@CN?N?N?J@H?JBLBNFRHNHPJNJVPLLB@XZh@h@JJFJDFBHBFBH@H@LBR@RBL?@DPBFBFHLFFFFHHNJVNNFPFLBN@H@D?NAPAPCREPE\\QJKDGFMTc@LYHSDEDKHKDCBC\\YJKHGLQ\\e@f@k@HKJIJGJEJEFCx@Sd@KVGPE`@MZKVGHAJAH?J?H@F@J@PBx@Pz@Rf@Jh@Hb@HD?NB`@DNBP@t@Bd@?j@@B?N@|@FJ@V@f@BV?L?D?T?@?NAt@CPAlAAdADF?F@J@FBB@B@BBBBDLFHBBBB@BDBH@J@L?Z?rCKJ?VCJAVEn@O^GZEREVEnASb@Id@GPETCNCHAfAKTCh@Ex@KJAVEr@O`AQzAYFAH?H?X?x@CD?h@?b@@v@HL@D?D@B@FBFDDFBDBF@FRvAFh@DP@DBJ@DLd@DPHVJRf@j@FJDFHFFDH@nBDL@J?H@NDHDLFFBFFZV~@t@NJLDH@J@F@F@J?\\AdB@H@B@B@B@DB@D?F?j@DNBHDHBBBDDDFBLDP@P?V?`AC\\A\\AT@P?L@B?B?B@B@D@DBh@^NHVHZFXFPDF@FDFFPLb@d@@@NLDBHDF@HBF@F?^?dBB~@?@?^?TATCl@MJCJERG@AFCHEHCFGHGNOVW^e@d@q@^e@T[dAeB@CJOHGBCDCLELCf@Ib@K^KPKLIFEFGJCNMNKZ[hBkBh@[`@[x@m@`@WNK\\ULGHGVMb@SFCHGBCb@WPORQn@q@HI@?HININIDCFCPEhA[FCl@QRELEb@GJAJAb@A~@?j@GJENELGVK^Yh@_@VMBCPI`@QhAc@LGHGJEFENKPMTQ`@_@HOrAiCLWN]XiABMLw@Hc@Hi@Lo@Rs@Vy@Hc@DU@S@YBm@D}@Ho@F[BQ@ERcANo@J]HWHWLYr@iBPc@Nc@\\eALm@Ji@Fa@@O@IFg@Ju@Fa@Da@B[Bo@@E@GBG@EBE@A@ABEDCFEFCDCFCBAJEFE@AFE@AP_@Zs@FMHODIBEDCXWd@_@r@o@ZUJKNOd@c@d@_@ZYp@m@Z]b@c@NO^e@Za@NQZ]LMVULMVURQLMJIDEHIBALKNMl@g@|@w@fAcA@A|AuAjD{Cr@m@^Y^YVQDCNKXWLMJMX[VSFEDELEJELELE`@MDATEVEREPCLCZGHARC`@E\\ERADANCHAHCHCFGHGDI@CDKTc@HKXo@TYl@i@FEHMDG@I?UE}BE{@?K?CBK@K@CFKHILI@AHEJCNAVCrAGRAt@CPCVAZEh@GVAf@K`@O^W@A^[b@_@LQJQJSJQ?CLYl@iA^w@FQ@Aj@y@j@oAzAiCP[DEDGBCJOFGJMJIx@q@TSRSDGHIPUp@}@NUNQXc@v@gAXc@JMBGDIBGBGDK@M@OAUAQ?IEy@A_@?Q?O@M@MF[FWHYHSNY?AJQPSX[PQLMHGTQ^WPMTOVSNMBCNOJMFMNYR_@Ra@BE`@u@JQBEl@cATe@FIJS\\c@",
  "MF39": "gcbxMkm}mAGA_@IgAYDI^cAJc@d@o@V[V_@TYPMHITOXQHCJGVKZKb@MrEsATITIp@Y^QRMTOb@Wb@YfFeF`AiAJMZ_@Z_@lBgCZk@NUDGBCR[PW@ET_@^OjDcGx@sA^m@nAuBHOzBwDDEj@aALQdAiBR[P[jB{C\\k@Xi@pA_CPg@|AgE`@qAPo@Po@Rw@DOHi@Jq@BUDW?E@CBE@?@?z@MDRBHBN@HBH@LBL?BBH@NDP@JBLDNDNDJBFFFHFHD~Az@JDb@TzAx@JFHFJFHHFD@@NPNNVb@Vf@LTHPRv@Jj@RnAFTHb@Px@Lf@BJDHDPFPHNHNLT@B`@t@@@`CjELPb@l@Vb@b@p@^r@@@b@x@@BNZXh@FJDJDJFJDJb@lADLHNFRTt@\\jA^rA`@bAJCv@A^CHA`AA`ABN?j@IBAZCb@Qx@a@HC@Al@WDCJEFCLCRE^GREFALCHAHCDAR?r@Gr@E`AAH?p@EP?n@?J?n@?RE\\GREBAHA`@GNCXIPCLAN?n@JVHZJbAXz@Tj@TnDLh@?P@H@r@FN@R@dDBdCEVAlBCzCA~A?rEG|A@d@?R@BOReBVaBDYDa@`AiGD_@D]Bk@`H{@tCa@rDe@rEq@vEq@hGy@NdBNzA@RPCj@Mh@Md@G`@Eh@Ah@Ab@MN@^Fl@L`APTDH@ZDTD`@DD?P@l@Bn@@H@B?B?FBD@DBHFVV",
  "MF40": "czzwM{ubnA}Tj@mCbN_@n@PzDiBFZrFmAlI_ENgFtDiDReC~Fk@pBk@Ns@ZFrEgHN_E|BB?yDxBqD`CsF_AcGeBiCmByBeCaDr@{F?{E_@{D[wDs@aCo@y@OcFNeC^uCnLmA|CeBjEwFlJ_G`JgHdLyDjHkEfEeClCwDpCiA`AsGpBeCn@aD~DeAr@",
  "MF42": "selwMekcnAqCjCqDtBa@D_Md@gIFyIfA}KpB}ANiIGuH^aE|AyBj@aDj@eJf@oD?gH~@uDfJeAlB{@fA}ApCs@tIg@zGiAtJF`IeA~EWv@eBhBo@hBGxBr@hPRvE_@pCmApDk@dBiC|BiBpDo@|As@fEqArEs@`AqClDyBtAaB|AeAxAwExAsGF}@lD}a@mBkGkFeQNii@pK{TnFyBlBWf@iCW[}BmCKaBdAeCtAqCSeC^w@J_FNyK[qBCsFiAk@?mAv@w@hBuApBc@~@qAn@uCb@gEpDiIxKy@hAeDb@eDj@qC^{Er@uDj@aBhCO|C_ApC_@tAiA|AkFhBqAr@wDtA{@~@[lB_@pAuBtC{FjHkEbFmAlDeBdDkF|Cq@r@zChJpAzG^tCWtA{@NyBMoD{@uEGaESWIgEwLgHqF",
  "MF45": "m~fxMsjdnA{BmG{CeDrA]nJkCsBgJ`KJvLkAfHc@tA|Hl@jAf@^NnAfCzBrEVbA~DzFUnAhGjIKr@hCRvEtC~G`BhJNf@o@|D[lBGhDf@j@v@f@^dBtBn@dAv@vGOlAvGtCxAn@`ApB~GaClDc@tCFdJ{@~EyB~FsEvFmKzOoFlHgFtBaIhB{E`BwElCyPj\\sGvMmAjEaJbEyZvO_PxKsGrGyYrTsG|C{WzHaLtCaJlAuDfAgOtByAnE}AdBsDxAgEhI{HvVeB^kCRuD}CiCuBqBw@iAGo@SgAiCuDs@}A@_FOmBu@DaC",
  "MF1K": "sbryM_dinAIWAEG]COCSEi@CSASCWGm@Gu@AK?Q@QDi@Dc@BYD[BYTsBXkCBWDWN}ANsAHi@Lw@b@oDF_@?GTgB\\cCLmANuALy@L{A@A@u@?u@Cu@Ee@K{@EOCOAAMc@KUEIKU]s@GMAEGIGKACg@aAgAyBcAyBc@aAgB_Eo@uA[s@o@sAg@cAe@_Ao@yAi@kAeA_CO[KYO]Qg@Us@K]GQQo@Ie@Os@QgAAKCMYmBI}@AEIw@Ge@Gm@C]?MAc@C_AAq@AW?KAk@?o@?OBgC@cA@_@@WHwA@[Bm@?QL}BHeDBq@HwABq@HsBB[@Q@OFi@@MB[BMD]D[DSJm@BSXqADUFSNm@`@iAHU^{@DIn@qA@?FSZq@FMBIJU\\s@Vm@j@uABEb@}@@C`@_AZo@Xq@`@_APc@Ja@Ja@Hc@Hk@Fi@Bo@B}@MCOAG?E@GBGDeC`BsAz@SLcC|A_C|Aa@VqAp@_@T{@d@GBm@\\[JkC|@o@X]PAB_Ah@_BfAq@h@y@n@UTONOTAB[`@SPODOHE@YFKBO@g@F_@B_BLa@D}@FUBk@DE@]Hm@VKFYNq@\\]J_@Hk@Di@DE?]?U?KCWKMKqAgACE",
  "MF2": "kfbyMecjnAa@AC?K?c@AiA@e@?c@@A?k@?g@Ay@EcAIiAAiACc@?A?_@?i@@o@By@DMDSFUJIBQJMFCBMHSTOTQVeAnBcApBu@vA]n@CDkAvBu@rAg@~@[h@MRg@v@[h@oAnBk@|@i@x@iA~AQZ_ArAYb@QVU\\SVSXOROTiA`BsBxCSZ?@SZ]f@cAtAg@t@Yb@KPILOZu@zAk@hA_@|@i@bAc@`AO\\{@dBEJcAlBaAlBINu@vAk@dA_@r@wAnCoAdCaAdBQX[j@EFINEHW`@ILi@bAOV]n@GLs@tACDcAjBsAjC_@p@EJWf@A@k@lAKTKRy@zAwCvFgArBILk@jAOd@KTm@dAEH}@bBgAvBU`@y@zAEHaAlBMXS^EJ]r@q@rAi@dAWf@aBbDyApCCDiAxB{AdCk@fAQb@Q^]bAKXMn@Eb@InA?Z@`A@^@^@VFlA@XFjBH`APpCBb@D^JfALrAd@nFj@hFDf@KLKFEDINILCHCLAF?L@H@F?BFh@@@@H@J@H@F?@@D?F?F?N?F?F@dA@lA?`AEp@K^]@a@Be@@iCJu@BcABuABK?gADmBFA?q@B_ADkL^kIVkAN]Ba@BqCFuAFuBLaADA?c@BgABE?}CCM?]EU?qDLo@@W_Ak@oBOm@So@IWGOEUq@wBOe@GUCOG[Ma@UkAo@aCESOu@QcBCc@Gk@GmAAOG]Kq@Ia@IYKUMSUc@MQi@cAi@cAmAsCk@sAGQQw@G[CY@W@a@D]F[H_@L[P[V[TUJEXUd@Ud@SNGfA]PC`@ONGNCDA`AG~@CZ?hACfCErAIJ?@?JCPIDAXQXWV[BGP_@FSNa@Rm@Rm@Pm@Rm@BKZu@Vo@JYJ[Rk@Tw@?CJ[FURu@R{@b@wABKJW?CFUDMBG@]zAmF`@}A`@{AjA}DDQLi@f@mBfBsHZsAt@sC@GXkAFYTiAHYZkBh@wCJk@Lq@F]JeA@?B}@@OBs@?aA@_B?k@?A?a@@}BVkABM@GZwA`@kBxAoHJ[Jc@DMH]TeAReAVqAH_@Pw@\\{AFUTiANq@zAkHB_@NAb@A^CXA\\ELCNCZEp@MpB]@ArAS\\G|AW`AQ`AQjB[hASn@Kt@Mh@Ib@IlASx@OfAQr@OdBe@lA_@b@MfD[lDUB?dAKh@G\\Gf@Ih@M`@Ov@Wd@Q|CaAlAUv@Od@Kh@O~Bo@jCq@n@QtAg@hEcBh@QFELG~@a@DCLEZSNMPMVUt@u@TWBERURULMNM^]PKPOJIPIb@WVOf@UVIXKHANCVCB?x@GH?j@EbAEz@En@Eb@AX?b@A^?RAd@?n@AfA@`@?h@?nAAvDGp@?p@@H@D?LB\\D~@?dAAbA@nADj@Af@Bp@@b@BX@b@?xBEz@CN@L@d@HXJ",
  "MF23A": "iqcxMewqnAkBz@c@PkBx@eAd@A?KDqB`A_@P]Pq@wASc@O]q@uAk@sAw@kBUg@_@_Am@_BKWo@}AAC_@{@EOu@sBQe@]w@KUe@sACE?AtA{@~@i@bBcArA}@x@g@@?p@c@r@c@n@a@dAs@CECEsAyBiA{BSm@U}@IY_@iAWu@IU[u@Uc@MOQOUMUMYMe@SYOqAi@c@UYU][}EiDIIMIKGICMEQEg@Ks@KCAeB[q@OSGUMUOi@]SOcBqA]W]Wa@YMIECm@Y]OMKIEGIGGEIOYo@yAWs@GMIOIMIKICICUEYCy@I_AGA?eBEWCKAMASEMEMEUESEWCWAsAEs@@i@AU?iCFm@DwAJE?mHj@mGb@g@?aAGgAMeD]WE}@MSCi@Gi@GWCEAiAOw@GaAEQ?Y?o@Ah@m@^a@FGdCeCb@g@z@}@zBsB~JoKh@q@nAsApAwApCsC`BiBjAoA|@cAb@e@l@m@FGj@i@\\]HKp@q@Z]TU`@a@|@aAp@w@l@m@l@q@`BiBl@q@HKp@u@|@cALMbAcAVYJIJKnAoA@CpAuAf@i@z@{@PSd@g@F}@Da@Jg@B[D_@Bg@@OBsABw@?MlAM|Fm@\\Ch@CRCf@E`AM`@GVGbAI|@GHCHADAFCFCJGLGNKZUDCDEDEDCFCFAFEHEBA`@QdAYr@Mv@Od@MRE|@OhAQx@KTGpBc@VE\\Ir@SdAUTGrD{@XGHAJ?L?J?L?`@@D?@?HADAFAlA[VIv@Ql@OvBk@f@Q@?^M`@Ud@]n@g@HMBG@C@C@E@IGi@SgBKy@?AM}@Ga@Ca@AOAWAO?G?i@?M?_@?a@@_@BUBMDMDMLSDIHMRW\\_@\\]LKLOHMn@_@LEdAm@`@Wt@O`@GNAd@ETAHA^Ef@EHABA^GXGVCTA\\?P?\\@L?X?^Al@Cv@IB?D?n@CbACJ?b@A^A|@Ej@CJAp@EnAKdCMp@?R@H?F@F@PDRFrHpCXB`@Dr@DhBN`A_@LId@[h@a@^Wp@e@LIb@S`@QRGh@Md@ITEd@IrBYTABAHAPAN?TFVDHFRLTb@HLHFFBHJV^h@x@V^FJBBl@j@PNAD?B?BGJIJGFKLeA~@{@t@]\\KJIHSR]ZQR[Zo@|@cA~Aa@d@STONOLIHEBUT}ApACBCB?BAB?F@F@JNV@BRVHJ^f@JLRXV\\TZV^`@h@RXJLDFFHLRHPDHBJBHBJ@HBH?PAH?F?BCHAHG\\GTKb@ELIVELO`@Qb@ADIR]x@GRGPCLCHAHAFAH?D?JANBPF`ADz@d@tFHn@Dp@Hv@B^Hl@Fr@F`@Ft@D\\@t@?HAD?BABEJc@r@a@v@g@x@ETcC`Ei@t@S^]n@IL_@r@cAlBE@C@A@AB_AfBq@nAYf@GLOVYh@Uf@MZI\\AJ?NARAb@?RAV?XCb@OfBG~AG~AC~@ATGz@Ev@Er@SvAI^I^EX?BE\\EVANCt@?DC^IzAEfA?BC\\Ch@ADC\\Gl@SjCGr@E|@Ad@@ZBr@@VDjAD|BDdA@PD~@FzABV?R?RARAXCRCTCNGVMx@Mz@I|@G^GXAd@@R@P@FDXFRRp@^fALb@HVNf@?BFPPp@BHs@N_@Fy@PA?m@NSF_@Jk@Rg@Tm@Vc@R_@PE@iAf@yAl@kA`@iAd@k@R{@VE@u@TaB^eCj@[Hc@JcATc@J}Bh@AIm@LeAV]HSDc@JUHmAd@OFOH_@P_@T]TA@YT]Xs@p@a@^e@b@SNSPYVGDWRk@b@MH_Ab@y@\\IDA@_@Pe@R[N"
};

const COLOR_HIGHLIGHT = "#4264fb";
const COLOR_MUTED = "#aaaaaa";
export const MAP_STYLE_ROUTE = {
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": COLOR_MUTED,
    "line-width": {
      type: "exponential",
      base: 1,
      stops: [
        [10, 3],
        [14, 8],
        [18, 3],
      ],
    },
  },
};

export const MAP_STYLE_HIGHLIGHTED_ROUTE = {
  ...MAP_STYLE_ROUTE,
  paint: {
    ...MAP_STYLE_ROUTE.paint,
    "line-color": COLOR_HIGHLIGHT,
  },
};

export const MAP_STYLE_METRO_ROUTE = {
  ...MAP_STYLE_ROUTE,
  paint: {
    ...MAP_STYLE_ROUTE.paint,
    "line-color": ['get', 'colour'],
  },
};

export const MAP_STYLE_METRO_STOPS = {
  type: "circle",
  paint: {
    "circle-color": "#ffffff",
    "circle-radius": {
      type: "exponential",
      base: 1,
      stops: [
        [10, 3],
        [14, 8],
        [18, 3],
      ],
    },
    "circle-stroke-width": 2,
    "circle-stroke-color": ['get', 'colour'],
  },
}

export const purpleLinePolyline = "ccryMkiinAv@lE|@lEH`@|@fEHZHRJXHNLVPXhA`BfEfGXb@Vb@Xh@Xp@Tx@dBrFPj@hAjCZ`BdAhDj@hB`@~@Zd@Z\\\\X\\R`@PXH`@J^F^D\\@ZA`@C`@GpEiApD{@fD{@`FsAvAa@rCy@~@Ul@MlGeArUyD^EPARArCA~E@hDAtB?bD?x@Cp@E~@GhE_@hAG\\AV@`@F`@LPHPHRLd@d@bA`BNTXXPN\\Vj@XpDdBb@Vd@\\n@h@r@v@h@l@~ApBbArAj@x@f@x@b@bAh@bBJh@Hj@RtAXlBJv@LjAFd@D`@Bz@?ZAh@EhBAj@@n@@|@BpBBVDVDNJVJPJNNNJJLHJFNFVHTDVBV@Z?fBIvFSvCQ`AGRCPCXCZE\\ChEShJg@xFUtEKhDO`AEjBQrCS\\ElAKjGc@hDUx@GdDUzAKx@?^CPC^KVI\\O\\SX]FIRe@Tu@n@eDNu@RgAf@oCd@iCVqBB_@@Y@WDuBBaB?c@BkA@w@Is@I}@Mu@_@iAUaA_AyBg@m@Ya@o@m@c@[m@[eBu@sAs@_Bo@eBcAuAi@gB_AcBy@y@c@_@YWa@K[AWAU?_@@a@@e@LW^w@VUd@UnBq@hCk@dB_@dAOvAUj@Ch@?`A?xBAdDGtEG|BEfDGxAAlAGvAM|@Ul@KfB]NCbAMx@QbAQlB]dB_@n@KhC_@`C]fDu@~@W`Co@VI^GxD]~E[~@I~@QhBo@d@Q~CcAxHiBbCs@rCaAfAc@pDwAzB_An@m@zAaBv@{@l@i@pA}@n@_@b@URI^Kf@I^EnCKxDKpCClD?dA?b@AzACP?P@`@Dn@Ph@J|@Nl@F~@HpAHvCHrDFpA@zABlB@d@AVBLBf@Nj@PnBl@h@Tz@ZnAf@n@ThAb@|@\\jAd@dBp@b@P`A^\\Nr@V|Al@xAj@~Aj@ZFT@R?R?P?Z@VBVB`@Hl@L\\HXJ`@N`@Nx@Zr@VdBh@~Cx@jAXdARpAVZD^D^Db@Bh@@f@@f@?d@ANAbBQTCx@Of@GVCTAVAd@?b@@\\@V@VBb@F^FRDb@Lf@PtBz@vB|@dCdAtExBjD~Al@X|@b@n@\\p@^VLZRXTd@^^\\p@p@p@l@PNRJRJXJ\\Hd@J~@Pb@HzAXTDbCb@pF`AlB^l@JrATn@LZFTFVHRHPJLHLJLJLPJNHNFNFLFPDNDLn@fDFTDNFNFLHNHLHLHL`@l@p@`@r@ZvEpArC|@xBn@dCr@fDbArCz@pGlBl@V^^ZXPh@F`@Db@ApBe@lT@f@Ff@Xt@X^XTd@Vh@Lv@DnEBtDD`]\\x@A`Sy@r@Ed@D`@Jf@Vn@Xx@b@~@d@t@h@l@j@lBdDz@pAf@p@^j@`@d@tBpAbAl@fNfHxAh@bAXlAX~AVr@D`ADr@BnAB|ADz@Cj@Ef@EtG_AtYcEhASzAYbAOv@KvK_BlASfAUr@Sr@MfASfDe@`Fw@|B]bNoBn@Mf@Qp@[`@]b@w@\\eAxAyFZw@Tc@X_@Xa@RYRU\\Y\\Qb@M~EuAj@OhDo@rD_AdAYbASt@Mb@ENAt@Ez@@`@F\\HvAp@dAp@fBnAfA|@dAfAnDhF`CbDd@\\h@Z|@^bN~FbCv@fCt@PF~FnBf@PtCxAlGxCfBz@jAj@l@Rf@Rd@Fj@?t@O`Bo@fMiEjKaDpAUNClEg@~AUfGSnHWfEUhFOxL?d@@zCJnBHj@D|Id@xADx@BfAAtBMvBEbBCp@E~@ClA?~AAr@?lABfABtADh@@bABbABjA@x@@z@@t@?v@@pA@z@BnA@tA@v@D^Bj@Fb@Lh@Rd@V^Tf@Z~CzB|AfAh@Vd@H^Bb@?`@E\\GXKd@Yz@e@l@Y\\O\\K`@GZEXAf@Dl@JZFb@Fh@J\\D^@pABjAAzB?fA@r@@vAF~AFhCRxH|@bNdBbBZz@`@j@b@`@`@b@l@Tb@Pb@Pl@z@dDvA~Ft@~Cz@dCpErM`J|Wl@~B`@pAJl@Fj@?f@Gh@Sz@a@vAiAlD[v@k@|Ak@pBOx@U`BYdBQ|@Sh@Wb@_HbHc@h@KNKTcAzE_@`B[fAEX?BAd@@j@Fd@H^Xt@h@p@vBpB|@r@nE`Ch@T`AX|@PbHnA~IlB`DfAbDhAdB|@pAz@tBbBj@h@h@d@~@jA|@jAbAxBxBdDhAnBp@hAr@~A^p@xBhDvBbCfB~AVNdCxArAt@z@t@x@bAr@bA`Ap@tD~@~Bn@b@H\\F`@B`@@v@Cd@?l@?h@?h@?D?f@@l@Bl@DnE\\rADjDHnAN`AXfCr@pAZfDz@lA^bBdArJnJ\\V`@^jIlEt@h@ZZp@|A`@`Ah@`Ap@n@n@\\l@TxCp@t@PTJ~ApArA|A~AvA~HnF`C`BvEbEfDbDv@t@dBdBz@h@xAh@vC|@fIfDhB`Aj@d@`@n@Xf@nBjCt@r@fBnAjBnBr@nApBhFl@bB~@hAtAbAtAlAb@`@t@r@bBhAzAfAnBvAdEnChAt@nA|@`@^Xb@b@fAXzA^lBBLFRHRHPJPLNNLNLPJPHPFRFRDRBR@R?R?RAdCC\\@F?V@\\B\\D\\F\\FZH\\J\\LZLZNXPXPVRVPVNf@VXJPFfEjAb@JTD~AN^D^F^HZHZJXJrC|AtBjA^RTHLF^LZHdB\\vDd@TFTHRHPHPJPJNJzFrDtCjBp@h@d@j@^r@bCxElAxBxA`Bt@f@zNpGzC|AbDnBvIxE|F`D`BlAp@d@bA|@";
export const greenLinePolyline = "ybexMsinmA_AsA_FoJQ]Ua@_@u@cAqBYo@aAkBm@cA_Ao@{BqAaCuAqAcAiAeA_@c@sFuHyCiE{H}K[c@_FyGmBgC_BwB{DeFs@u@u@s@eAy@{@e@y@a@wEcBoBm@aBw@q@i@s@u@q@_Ao@}AiAqD_DyJwDgM{@mCe@gASYYSo@Yy@[cASoHiAwCg@wCm@iIaB[GiFcAgDs@uEkAq@M}Bc@mD{@o@MyEaAk@OaCo@{Ak@aDwB{@g@w@k@qBeB{@w@a@]aCiBWQqAgAuAoAOMoEwDoBaBuBgBwCmCqCqCoBoBwA_B_AgAwBeCiCuCsA}AqAcBsDwFg@eAWq@IOWoAKe@q@sDM_AEw@Aw@D}@`@{ED]@k@Ck@Eu@KqBEoA?o@Bk@De@Bs@JsAPgDTeCF{@FcBJyKBuAAo@GeAKkAIw@]}Ag@_DMeAMqAQeBKoBMmBOoAIc@Qe@]e@]Wm@[YIa@G]Ca@?eA@aHDe@@c@Da@Hi@Lc@Li@N]Fa@F_@Da@Bc@@]?YA]CYCYGOESISKOMMMMMKQIOEMGWESCQA[?YBgH@yD@_B@_D@gGBeH@cH@{CJuM@_DHsPByPBiM@mG@mB?_M@oF@iQ@iB@q@D]DULYR_@\\[j@[h@Od@GhOBdACx@Ct@Ev@EdAGv@If@MVKTOVSNURc@L_@F_@BYBqE@uH?aHDcNHaD?m@Cm@Ik@IYoA{ESaAq@kCg@sFi@yGGuE@s@Ds@Fm@ToAXeBLaCGwFAmBUsHAw@PmA~HqUR_ADiAEiK?mDRaF?kBL}@Pe@nAyCZq@LWJe@DUDwE@{@IuIK{LHgGBaBH}CJy@Lm@^gAn@kAz@mAbA{A~EwHlBwClBiDxCwElDuFj@o@\\Sd@O^Ej@@v@Fx@Jh@FT@VAZAjAIdAMnAOn@Ib@ElFYf@GZGTGn@QrFmB~DmAtHmBjCc@lBQzAEjA?`ADvANzNfB`C^|@Hp@?p@Mn@Sd@]d@g@Vo@NeAx@kIz@sKtAsNR{BTiBN_BBiAAiAGw@C[Gw@m@eDKcAOs@IYOc@Oa@OYOYU]QUSUSUSOQMSOg@YSKa@S_JaEuCqAy@_@a@W_@a@We@O[COCOCUBeABu@BuAHkCDuBFsADi@Fc@TqAx@sEf@cDJk@J[dAeCvAiDv@cBj@gAP[RUVYb@]XQ^SzFqCjI}DtCuAfD{AnOoHb@STMb@Y`@UpCqAdD}AtCsAnLoFrDgBvF}ChF_DzLeGzLaGhAc@hBm@v@S|GkA`Fy@t@QjA]dAc@rCoAfB_AnAk@lGqChO{GnDqAtFcCVQvJuIx@[zUwFlFsAtAg@`LwExB_AfRqD`TqFdBe@~EqAtBk@dI{BtNyD";

export const METRO_LINES_GEOJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "colour": "#e542de",
        "name": "Purple Line",
        "name:kn": "ನೇರಳೆ ಪಥ"
      },
      "geometry": {
        "type": "LineString",
        coordinates: polyline.decode(decodeURIComponent(purpleLinePolyline)),
      },
    },
    {
      "type": "Feature",
      "properties": {
        "colour": "#009933",
        "name": "Green Line",
        "name:kn": "ಹಸಿರು ಪಥ"
      },
      "geometry": {
        "type": "LineString",
        coordinates: polyline.decode(decodeURIComponent(greenLinePolyline)),
      },
    }
  ]
};

export const METRO_STOPS_DATA = [
  {
    "coordinates": [
      77.54985871019599,
      13.023310768146636
    ],
    line: "green",
    "name": "Yeshwanthpur",
    "name_kn": "ಯಶವಂತಪುರ",
    id: 64,
  },
  {
    "coordinates": [
      77.74683954673206,
      12.985703468891176
    ],
    line: "purple",
    "name": "Kadugodi Tree Park",
    "name_kn": "ಕಾಡುಗೋಡಿ ಟ್ರೀ ಪಾರ್ಕ್",
    id: 23,
  },
  {
    "coordinates": [
      77.50012095084863,
      13.048113754119699
    ],
    line: "green",
    "name": "Nagasandra",
    "name_kn": "ನಾಗಸಂದ್ರ",
    id: 37,
  },
  {
    "coordinates": [
      77.757859,
      12.9956461
    ],
    line: "purple",
    "name": "Whitefield (Kadugodi)",
    "name_kn": "ವೈಟ್‌ಫೀಲ್ಡ್ (ಕಾಡುಗೋಡಿ)",
    id: 65,
  },
  {
    "coordinates": [
      77.7538033,
      12.9873426
    ],
    line: "purple",
    "name": "Hopefarm Channasandra",
    "name_kn": "ಹೋಪ್ ಫಾರ್ಮ್ ಚನ್ನಸಂದ್ರ",
    id: 16,
  },
  {
    "coordinates": [
      77.7377718,
      12.9876393
    ],
    line: "purple",
    "name": "Pattandur Agrahara",
    "name_kn": "ಪಟ್ಟಂದೂರು ಅಗ್ರಹಾರ",
    id: 42,
  },
  {
    "coordinates": [
      77.7275361,
      12.9811949
    ],
    line: "purple",
    "name": "Sri Sathya Sai Hospital",
    "name_kn": "ಶ್ರೀ ಸತ್ಯ ಸಾಯಿ ಆಸ್ಪತ್ರೆ",
    id: 57,
  },
  {
    "coordinates": [
      77.7248845,
      12.9766408
    ],
    line: "purple",
    "name": "Nallurhalli",
    "name_kn": "ನಲ್ಲೂರಹಳ್ಳಿ",
    id: 38,
  },
  {
    "coordinates": [
      77.7155586,
      12.977594
    ],
    line: "purple",
    "name": "Kundalahalli",
    "name_kn": "ಕುಂದಲಹಳ್ಳಿ",
    id: 29,
  },
  {
    "coordinates": [
      77.7087854,
      12.9808558
    ],
    line: "purple",
    "name": "Seetharampalya",
    "name_kn": "ಸೀತಾರಾಮ ಪಾಳ್ಯ",
    id: 50,
  },
  {
    "coordinates": [
      77.711326,
      12.9888029
    ],
    line: "purple",
    "name": "Hoodi",
    "name_kn": "ಹೂಡಿ",
    id: 15,
  },
  {
    "coordinates": [
      77.7036768,
      12.9934505
    ],
    line: "purple",
    "name": "Garudacharapalya",
    "name_kn": "ಗರುಡಾಚಾರ್ ಪಾಳ್ಯ",
    id: 12,
  },
  {
    "coordinates": [
      77.6927176,
      12.9965445
    ],
    line: "purple",
    "name": "Singayyanapalya",
    "name_kn": "ಸಿಂಗಯ್ಯನಪಾಳ್ಯ",
    id: 51,
  },
  {
    "coordinates": [
      77.6776703,
      12.9999024
    ],
    line: "purple",
    "name": "Krishnarajapura (K.R.Pura)",
    "name_kn": "ಕೃಷ್ಣರಾಜಪುರ (ಕೆ.ಆರ್.ಪುರ)",
    id: 25,
  },
  {
    "coordinates": [
      77.6684619,
      12.9965158
    ],
    line: "purple",
    "name": "Benniganahalli",
    "name_kn": "ಬೆನ್ನಿಗಾನಹಳ್ಳಿ",
    id: 3,
  },
  {
    "coordinates": [
      77.5125535,
      13.0432607
    ],
    line: "green",
    "name": "Dasarahalli",
    "name_kn": "ದಾಸರಹಳ್ಳಿ",
    id: 9,
  },
  {
    "coordinates": [
      77.5197351,
      13.0394104
    ],
    line: "green",
    "name": "Jalahalli",
    "name_kn": "ಜಾಲಹಳ್ಳಿ",
    id: 19,
  },
  {
    "coordinates": [
      77.5631963,
      12.9965253
    ],
    line: "green",
    "name": "Srirampura",
    "name_kn": "ಶ್ರೀರಾಮಪುರ",
    id: 56,
  },
  {
    "coordinates": [
      77.6523612,
      12.9907594
    ],
    line: "purple",
    "name": "Baiyyappanahalli",
    "name_kn": "ಬೈಯ್ಯಪ್ಪನಹಳ್ಳಿ ಮೆಟ್ರೋ ನಿಲ್ದಾಣ",
    id: 2,
  },
  {
    "coordinates": [
      77.644897,
      12.9859306
    ],
    line: "purple",
    "name": "Swami Vivekananda Road",
    "name_kn": "ಸ್ವಾಮಿ ವಿವೇಕಾನಂದ ರಸ್ತೆ",
    id: 54,
  },
  {
    "coordinates": [
      77.6386612,
      12.9783325
    ],
    line: "purple",
    "name": "Indiranagar",
    "name_kn": "ಇಂದಿರಾನಗರ",
    id: 18,
  },
  {
    "coordinates": [
      77.626686,
      12.9764992
    ],
    line: "purple",
    "name": "Halasuru",
    "name_kn": "ಹಲಸೂರು",
    id: 14,
  },
  {
    "coordinates": [
      77.6170205,
      12.9730218
    ],
    line: "purple",
    "name": "Trinity",
    "name_kn": "ಟ್ರಿನಿಟಿ ಮೆಟ್ರೊ ನಿಲ್ದಾಣ",
    id: 59,
  },
  {
    "coordinates": [
      77.6067902,
      12.9755264
    ],
    line: "purple",
    "name": "Mahatma Gandhi Road",
    "name_kn": "ಮಹಾತ್ಮ ಗಾಂಧಿ ರಸ್ತೆ",
    id: 35,
  },
  {
    "coordinates": [
      77.5975756,
      12.9809575
    ],
    line: "purple",
    "name": "Cubbon Park",
    "name_kn": "ಕಬ್ಬನ್ ಪಾರ್ಕ್",
    id: 8,
  },
  {
    "coordinates": [
      77.5916385,
      12.9787419
    ],
    line: "purple",
    "name": "Dr. B R Ambedkar Station, Vidhana Soudha",
    "name_kn": "ಡಾ.ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್ ಠಾಣೆ, ವಿಧಾನಸೌಧ",
    id: 61,
  },
  {
    "coordinates": [
      77.58422,
      12.9745197
    ],
    line: "purple",
    "name": "Sir M Vishweshwariah - Central College",
    "name_kn": "ಸರ್ ಎಂ ವಿಶ್ವೇಶ್ವರಯ್ಯ - ಸೆಂಟ್ರಲ್ ಕಾಲೇಜು",
    id: 53,
  },
  {
    "coordinates": [
      77.5728757,
      12.9757079
    ],
    line: "purple_green",
    "name": "Nadaprabhu Kempegowda Station, Majestic",
    "name_kn": "ನಾಡಪ್ರಭು ಕೆಂಪೇಗೌಡ ನಿಲ್ದಾಣ, ಮೆಜೆಸ್ಟಿಕ್",
    id: 34,
  },
  {
    "coordinates": [
      77.5653767,
      12.9758768
    ],
    line: "purple",
    "name": "Krantivira Sangolli Rayanna Railway Station",
    "name_kn": "ಕ್ರಾಂತಿವೀರ ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ ರೈಲು ನಿಲ್ದಾಣ",
    id: 5,
  },
  {
    "coordinates": [
      77.5553523,
      12.975632
    ],
    line: "purple",
    "name": "Magadi Road",
    "name_kn": "ಮಾಗಡಿ ರಸ್ತೆ ಮೆಟ್ರೊ",
    id: 31,
  },
  {
    "coordinates": [
      77.5456215,
      12.9742933
    ],
    line: "purple",
    "name": "Sri Balagangadharanatha Swamiji Station, Hosahalli",
    "name_kn": "ಶ್ರೀ ಬಾಲಗಂಗಾಧರನಾಥ ಸ್ವಾಮೀಜಿ ನಿಲ್ದಾಣ, ಹೊಸಹಳ್ಳಿ",
    id: 17,
  },
  {
    "coordinates": [
      77.5374044,
      12.9709559
    ],
    line: "purple",
    "name": "Vijayanagar",
    "name_kn": "ವಿಜಯನಗರ",
    id: 62,
  },
  {
    "coordinates": [
      77.5335788,
      12.9618931
    ],
    line: "purple",
    "name": "Attiguppe",
    "name_kn": "ಅತ್ತಿಗುಪ್ಪೆ ಮೆಟ್ರೋ",
    id: 1,
  },
  {
    "coordinates": [
      77.5370122,
      12.9520578
    ],
    line: "purple",
    "name": "Deepanjali Nagar",
    "name_kn": "ದೀಪಾಂಜಲಿ ನಗರ",
    id: 10,
  },
  {
    "coordinates": [
      77.5301588,
      12.9467183
    ],
    line: "purple",
    "name": "Mysore Road",
    "name_kn": "ಮೈಸೂರು ರಸ್ತೆ ಮೆಟ್ರೋ",
    id: 36,
  },
  {
    "coordinates": [
      77.5707293,
      12.9904629
    ],
    line: "green",
    "name": "Mantri Square Sampige Road",
    "name_kn": "ಮಂತ್ರಿ ಸ್ಕ್ವೇರ್ ಸಂಪಿಗೆ ರಸ್ತೆ",
    id: 48,
  },
  {
    "coordinates": [
      77.5568986,
      12.9985297
    ],
    line: "green",
    "name": "Mahakavi Kuvempu Road",
    "name_kn": "ಮಹಾಕವಿ ಕುವೆಂಪು ರಸ್ತೆ",
    id: 33,
  },
  {
    "coordinates": [
      77.5496568,
      13.0005247
    ],
    line: "green",
    "name": "Rajajinagar",
    "name_kn": "ರಾಜಾಜಿನಗರ",
    id: 45,
  },
  {
    "coordinates": [
      77.5487134,
      13.0080952
    ],
    line: "green",
    "name": "Mahalakshmi",
    "name_kn": "ಮಹಾಲಕ್ಷ್ಮಿ",
    id: 32,
  },
  {
    "coordinates": [
      77.5539839,
      13.0146544
    ],
    line: "green",
    "name": "Sandal Soap Factory",
    "name_kn": "ಸಾಂಡಲ್ ಸೋಪ್ ಕಾರ್ಖಾನೆ",
    i: 49,
  },
  {
    "coordinates": [
      77.5408961,
      13.0284078
    ],
    line: "green",
    "name": "Goraguntepalya",
    "name_kn": "ಗೊರಗುಂಟೆಪಾಳ್ಯ",
    id: 13,
  },
  {
    "coordinates": [
      77.533201,
      13.0330189
    ],
    line: "green",
    "name": "Peenya",
    "name_kn": "ಪೀಣ್ಯ",
    id: 43,
  },
  {
    "coordinates": [
      77.5254924,
      13.0363176
    ],
    line: "green",
    "name": "Peenya Industry",
    "name_kn": "ಪೀಣ್ಯ ಇಂಡಸ್ಟ್ರಿ",
    id: 44,
  },
  {
    "coordinates": [
      77.5701194,
      12.8960498
    ],
    line: "green",
    "name": "Yelachenahalli",
    "name_kn": "ಯಲಚೇನಹಳ್ಳಿ",
    id: 63,
  },
  {
    "coordinates": [
      77.5731279,
      12.9074747
    ],
    line: "green",
    "name": "Jayaprakash Nagar",
    "name_kn": "ಜೆಪಿ ನಗರ",
    id: 21,
  },
  {
    "coordinates": [
      77.573598,
      12.9152208
    ],
    line: "green",
    "name": "Banashankari",
    "name_kn": "ಬನಶಂಕರಿ",
    id: 4,
  },
  {
    "coordinates": [
      77.5802659,
      12.921331
    ],
    line: "green",
    "name": "Rashtreeya Vidyalaya Road",
    "name_kn": "ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾಲಯ ರಸ್ತೆ",
    id: 47,
  },
  {
    "coordinates": [
      77.5801439,
      12.9295069
    ],
    line: "green",
    "name": "Jayanagar",
    "name_kn": "ಜಯನಗರ",
    id: 20,
  },
  {
    "coordinates": [
      77.5800556,
      12.9382573
    ],
    line: "green",
    "name": "South End Circle",
    "name_kn": "ಸೌತ್ ಎಂಡ್ ಸರ್ಕಲ್",
    id: 55,
  },
  {
    "coordinates": [
      77.580016,
      12.9465265
    ],
    line: "green",
    "name": "Lalbagh",
    "name_kn": "ಲಾಲ್ ಬಾಗ್",
    id: 30,
  },
  {
    "coordinates": [
      77.5736794,
      12.9505161
    ],
    line: "green",
    "name": "National College",
    "name_kn": "ನ್ಯಾಶನಲ್ ಕಾಲೇಜು",
    id: 39,
  },
  {
    "coordinates": [
      77.5746578,
      12.9608788
    ],
    line: "green",
    "name": "Krishna Rajendra Market",
    "name_kn": "ಕೃಷ್ಣರಾಜೇಂದ್ರ ಮಾರುಕಟ್ಟೆ",
    id: 24,
  },
  {
    "coordinates": [
      77.5745663,
      12.9668935
    ],
    line: "green",
    "name": "Chickpete",
    "name_kn": "ಚಿಕ್ಕಪೇಟೆ",
    id: 7,
  },
  {
    "coordinates": [
      77.5124063,
      12.9354357
    ],
    line: "purple",
    "name": "Jnanabharathi",
    "name_kn": "ಜ್ಞಾನ ಭಾರತಿ",
    id: 22,
  },
  {
    "coordinates": [
      77.5251166,
      12.9416715
    ],
    line: "purple",
    "name": "Pantharapalya - Nayandahalli",
    "name_kn": "ಪಂತರಪಾಳ್ಯ - ನಾಯಂಡಹಳ್ಳಿ",
    id: 40,
  },
  {
    "coordinates": [
      77.4878557,
      12.914689
    ],
    line: "purple",
    "name": "Kengeri Bus Terminal",
    "name_kn": "ಕೆಂಗೇರಿ ಬಸ್ ಟರ್ಮಿನಲ್",
    id: 27,
  },
  {
    "coordinates": [
      77.4765784,
      12.9079105
    ],
    line: "purple",
    "name": "Kengeri",
    "name_kn": "ಕೆಂಗೇರಿ",
    id: 26,
  },
  {
    "coordinates": [
      77.5196788,
      12.9365996
    ],
    line: "purple",
    "name": "Rajarajeshwari Nagar",
    "name_kn": "ರಾಜರಾಜೇಶ್ವರಿ ನಗರ",
    id: 46,
  },
  {
    "coordinates": [
      77.4983509,
      12.9242505
    ],
    line: "purple",
    "name": "Pattanagere",
    "name_kn": "ಪಟ್ಟಣಗೆರೆ",
    id: 41,
  },
  {
    "coordinates": [
      77.4612877,
      12.8973539
    ],
    line: "purple",
    "name": "Challaghatta",
    "name_kn": "ಚಲ್ಲಘಟ್ಟ",
    id: 6,
  },
  {
    "coordinates": [
      77.5299545,
      12.8617298
    ],
    line: "green",
    "name": "Silk Institute",
    "name_kn": "ರೇಷ್ಮೆ ಸಂಸ್ಥೆ",
    id: 52,
  },
  {
    "coordinates": [
      77.5383958,
      12.8714097
    ],
    line: "green",
    "name": "Thalaghattapura",
    "name_kn": "ತಲಘಟ್ಟಪುರ",
    id: 58,
  },
  {
    "coordinates": [
      77.5447414,
      12.8774369
    ],
    line: "green",
    "name": "Vajarahalli",
    "name_kn": "ವಾಜರಹಳ್ಳಿ",
    id: 60,
  },
  {
    "coordinates": [
      77.5527546,
      12.8846435
    ],
    line: "green",
    "name": "Doddakallasandra",
    "name_kn": "ದೊಡ್ಡಕಲ್ಲಸಂದ್ರ",
    id: 11,
  },
  {
    "coordinates": [
      77.5626665,
      12.8889671
    ],
    line: "green",
    "name": "Konanakunte Cross",
    "name_kn": "ಕೋಣನಕುಂಟೆ ಕ್ರಾಸ್",
    id: 28,
  }
];

export const METRO_STOPS_GEOJSON = {
  "type": "FeatureCollection",
  "features": _.map(METRO_STOPS_DATA, s => ({
    "type": "Feature",
    "properties": {
      "colour": s.line === "purple" ? "#e542de" : "#009933",
      "name": s.name,
      "name:kn": s.name_kn,
    },
    "geometry": {
      "type": "Point",
      coordinates: s.coordinates,
    },
  }))
};
