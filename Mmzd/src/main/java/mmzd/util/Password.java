package mmzd.util;

public class Password {
	public static int sum = 0;
	public static String ss = "";
	public static int totel = 0;

	public static void xxx(String[] arrc, int psLength, int i) {
		for (; i < arrc.length; i++) {
			String a = arrc[i];
			ss = ss + a;
			sum++;
			if (sum == psLength) {
				System.out.println(ss);
				totel++;
				ss = ss.substring(0, ss.length() - 1);
				sum--;
				if (i == (arrc.length - 1)) {
					sum--;
					ss = ss.substring(0, ss.length() - 1);
				}
				continue;
			} else {
				xxx(arrc, psLength, 0);
			}
			if (i == (arrc.length - 1)) {
				sum--;
				if (ss.equals("")) {
					System.out.println("...." + totel);
					return;
				}
				ss = ss.substring(0, ss.length() - 1);
			}
		}
	}

	public static void main(String a[]) {
		String[] a1 = { "1", "2", "3", "4", "5" };
		xxx(a1, 3, 0);

	}
}
